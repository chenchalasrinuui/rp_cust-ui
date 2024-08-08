"use client"
import React, { useEffect, useState } from 'react'
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies'
import { useDispatch } from 'react-redux'
import { AppTable } from '../reusableComponents/AppTable'
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
    const handleDelete = () => {

    }
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
            />
        </div>
    )
}
