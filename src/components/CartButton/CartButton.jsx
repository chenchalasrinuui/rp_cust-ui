import React, { Fragment } from 'react'
import { CartSVG } from './CartSVG'
import styles from './CartButton.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'
export const CartButton = () => {
    const count = useSelector((state) => state?.appReducer?.cartCount)
    return (
        <Fragment >
            <Link href="/cart" className={styles.cartSvg}>
                <CartSVG />
                <span>{count}</span>
            </Link>
        </Fragment>
    )
}
