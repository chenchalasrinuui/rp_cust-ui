"use client"
import React, { useEffect, useState } from 'react'
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies'
export const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const getCartItems = async () => {
        const id = await AppCookie.getCookie("id")
        try {
            const res = await Ajax.sendGetReq('cust/cartList', { id })
            console.log(11, res)
        } catch (ex) {

        } finally {

        }
    }
    useEffect(() => {
        getCartItems();
    }, [])
    return (
        <div>Cart</div>
    )
}
