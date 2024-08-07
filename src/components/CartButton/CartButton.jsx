import React, { Fragment } from 'react'
import { CartSVG } from './CartSVG'
import styles from './CartButton.module.css'
import Link from 'next/link'
export const CartButton = () => {
    return (
        <Fragment >
            <Link href="/cart" className={styles.cartSvg}>
                <CartSVG />
                <span>2</span>
            </Link>


        </Fragment>
    )
}
