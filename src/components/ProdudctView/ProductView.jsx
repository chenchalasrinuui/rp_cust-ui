"use client"
import React, { useEffect, useState } from 'react'
import styles from './ProductView.module.css'
import { Ajax, VENDOR_BASE_URL } from '@/services/ajax'
import { useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const ProductView = (props) => {
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
    return (
        <div>
            <Card className="product-card" sx={{ width: 200 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={`${VENDOR_BASE_URL}${product?.path}`}
                        alt="green iguana"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            cost: {product?.cost}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
