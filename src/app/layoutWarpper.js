import React from 'react'
import { useSelector } from 'react-redux';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/reusableComponents/Loader';
import { useDispatch } from 'react-redux';
import { AppCookie } from '@/services/cookies';

export const LayoutWarpper = ({ children }) => {
    const isShowLoader = useSelector(state => state?.appReducer?.isShowLoader);
    const dispatch = useDispatch();
    (async () => {
        const isLoggedIn = await AppCookie.isLoggedIn();
        const uid = await AppCookie.getCookie("uid")
        dispatch({ type: "AUTH", payload: { isLoggedIn, uid } })
    })()
    return (
        <html lang="en">
            <body>

                <Header />
                {children}
                <Footer />
                {isShowLoader && <Loader />}
            </body>
        </html>
    );
}
