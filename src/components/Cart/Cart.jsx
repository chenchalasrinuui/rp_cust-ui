"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies'
import { useDispatch } from 'react-redux'
import { AppTable } from '../reusableComponents/AppTable'
import { handleToaster } from '@/services/functions'
export const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();
    const getCartItems = async () => {
        dispatch({ type: "LOADER", payload: true })
        const id = await AppCookie.getCookie("id")
        try {
            const res = await Ajax.sendGetReq('cust/cartList', { id })
            setCartItems(res?.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    const handleDelete = useCallback(async (obj) => {
        console.log(obj)
        dispatch({ type: "LOADER", payload: true })
        const id = await AppCookie.getCookie("id")
        try {
            const res = await Ajax.sendDeleteReq(`cust/deleteCart?uid=${id}&productId=${obj.prouctId}`)
            const { acknowledged, deletedCount, count } = res?.data
            if (acknowledged && deletedCount) {
                dispatch({ type: "AUTH", payload: { cartCount: count } })
                sessionStorage.cartCount = count
                getCartItems();
                handleToaster(dispatch, "Deleted from cart", "green")
            }
        } catch (ex) {
            console.error(ex);
            handleToaster(dispatch, "Not deleted", "red")
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }, [])

    const handleBuyNow = useCallback((obj) => {
        console.log('buynow', obj)
    }, [])
    useEffect(() => {
        getCartItems();
    }, [])
    return (
        <div>
            <h3 className='text-center'>Cart Details</h3>
            <AppTable
                hasImage={true}
                imageHeaders={["Product Image"]}
                imageColumns={["path"]}
                headers={["Name", "Cost"]}
                data={cartItems}
                columns={['name', 'cost']}
                isShowDelete={true}
                handleDelete={handleDelete}
                isShowBuyNow={true}
                handleBuyNow={handleBuyNow}
            />
        </div>
    )
}
