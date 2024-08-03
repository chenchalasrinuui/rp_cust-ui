"use client"
import React, { useState, useEffect } from 'react'
import styles from './Orders.module.css'
import { useDispatch } from 'react-redux'
import { AppCookie } from '@/services/cookies'
import { Ajax } from '@/services/ajax'
export const Order = () => {
    const [oreders, setOrders] = useState([])
    const dispatch = useDispatch();
    const getOrders = async () => {
        dispatch({ type: "LOADER", payload: true })
        const id = await AppCookie.getCookie("id")
        try {
            const res = await Ajax.sendGetReq(`cust/orders-list?id=${id}`)
            console.log(333, res);
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        getOrders();
    }, [])
    return (
        <div>
            <h3>Orders list</h3>
        </div>
    )
}
