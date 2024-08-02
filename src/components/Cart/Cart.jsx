"use client"
import React, { useEffect, useState } from 'react'
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies'
import { useDispatch } from 'react-redux'
export const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();
    const getCartItems = async () => {
        dispatch({ type: "LOADER", payload: true })
        const id = await AppCookie.getCookie("id")
        try {
            const res = await Ajax.sendGetReq('cust/cartList', { id })
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        getCartItems();
    }, [])
    return (
        <div>Cart</div>
    )
}
