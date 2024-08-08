"use client"
import React, { useEffect, useState } from 'react'
import styles from './ProductView.module.css'
import { Ajax, VENDOR_BASE_URL } from '@/services/ajax'
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material'
import Image from 'next/image'
import Button from '@mui/material/Button';
import { AppCookie } from '@/services/cookies'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { handleToaster } from '@/services/functions'

export const ProductView = (props) => {
    const pathName = usePathname();
    const router = useRouter();
    const [product, setProduct] = useState({})
    const { id } = props?.params
    const dispatch = useDispatch();
    const getProductDetails = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendGetReq(`cust/getProductById?id=${id}`)
            setProduct(res?.data)
        } catch (ex) {
            setProduct({})
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }

    }

    useEffect(() => {
        getProductDetails();
    }, [])
    const fnIsLoggedIn = () => {
        const token = sessionStorage.token
        if (!token) {
            sessionStorage.pathName = pathName;
            return false
        }
        return true
    }
    const handleBuyNow = async () => {
        try {
            if (!fnIsLoggedIn()) {
                router.push('/login');
                return;
            }
            router.push(`/buy-now/${id}`)

        } catch (ex) {

        } finally {

        }
    }
    const handleAddToCart = async () => {
        try {
            if (!fnIsLoggedIn()) {
                router.push('/login');
                return;
            }
            dispatch({ type: "LOADER", payload: true })
            const id = await AppCookie.getCookie("id")
            const dataObj = { productId: product._id, uid: id }
            const res = await Ajax.sendPostReq('cust/saveToCart', { data: dataObj })
            const { acknowledged, insertedId, message, count } = res.data;
            if (acknowledged && insertedId) {
                handleToaster(dispatch, 'Added to the cart', 'green')
                sessionStorage.cartCount = count;
                dispatch({ type: "AUTH", payload: { cartCount: count } })
                router.push('/cart')
            } else {
                handleToaster(dispatch, message, 'red')
            }
        } catch (ex) {
            handleToaster(dispatch, ex.message, 'red')
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {product?.path && <Image src={`${VENDOR_BASE_URL}${product?.path}`} alt="product image" width="500" height="500" />}
            </Grid>
            <Grid item xs={6}>
                <h1>Product Name:{product?.name}</h1>
                <h3>Product Cost: {product?.cost}</h3>
                <Button onClick={handleBuyNow} variant="contained" size="large">Buy Now</Button>
                <Button onClick={handleAddToCart} variant="outlined" size="large">Add to Cart</Button>
            </Grid>
        </Grid>
    )
}
