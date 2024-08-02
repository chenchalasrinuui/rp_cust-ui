import React from 'react'
import styles from './Orders.module.css'
import { Address } from '../Address/Address'
export const Order = () => {
    return (
        <div className={styles.ordersDiv}>
            <Address />
        </div>
    )
}
