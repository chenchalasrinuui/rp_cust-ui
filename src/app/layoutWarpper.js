import React from 'react'
import { useSelector } from 'react-redux';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/reusableComponents/Loader';

export const LayoutWarpper = ({ children }) => {
    const store = useSelector((state) => state);
    return (
        <html lang="en">
            <body>

                <Header />
                {children}
                <Footer />
                {store?.appRedcuer?.isShowLoader && <Loader />}
            </body>
        </html>
    );
}
