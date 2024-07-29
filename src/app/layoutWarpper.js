"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/reusableComponents/Loader';
import { useDispatch } from 'react-redux';
import { AppCookie } from '@/services/cookies';
import { Toaster } from '@/components/reusableComponents/Toaster';
export const LayoutWarpper = ({ children }) => {
    const isShowLoader = useSelector(state => state?.appReducer?.isShowLoader);
    const isShowToaster = useSelector(state => state?.appReducer?.toaster?.isShowToaster);

    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const isLoggedIn = await AppCookie.isLoggedIn();
            const uid = await AppCookie.getCookie("uid")
            dispatch({ type: "AUTH", payload: { isLoggedIn, uid } })
        })()
    }, [])

    return (
        <html lang="en">
            <body>

                <Header />
                {children}
                <Footer />
                {isShowLoader && <Loader />}
                {isShowToaster && <Toaster />}
            </body>
        </html>
    );
}
