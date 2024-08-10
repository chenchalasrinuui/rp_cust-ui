"use client"
import React, { useState, useEffect, useCallback } from 'react'
import styles from './Orders.module.css'
import { useDispatch } from 'react-redux'
import { AppCookie } from '@/services/cookies'
import { Ajax } from '@/services/ajax'
import { useRouter } from 'next/navigation'
import { AppTable } from '../reusableComponents/AppTable'
export const Order = () => {
    const [oreders, setOrders] = useState([])
    const dispatch = useDispatch();
    const router = useRouter();
    const getOrders = async () => {
        dispatch({ type: "LOADER", payload: true })
        const id = await AppCookie.getCookie("id")
        try {
            const res = await Ajax.sendGetReq(`cust/orders-list?id=${id}`)
            setOrders(res?.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        getOrders();
    }, [])
    const handleBuyNow = useCallback((obj) => {
        console.log('buynow', obj)
        try {
            router.push(`/buy-now/${obj?.prouctId}`)

        } catch (ex) {

        } finally {

        }
    }, [])
    return (
        <div>
            <h3 className='text-center'>Order Details</h3>
            <AppTable
                hasImage={true}
                imageHeaders={["Product Image"]}
                imageColumns={["path"]}
                headers={["Name", "Cost"]}
                data={oreders}
                columns={['name', 'cost']}
                isShowBuyNow={true}
                handleBuyNow={handleBuyNow}
            />
        </div>
    )
}
