import React from 'react'
import styles from './Menu.module.css'
import Link from 'next/link'
import config from './configuration.json'
import { useDispatch } from 'react-redux'
import { AppCookie } from '@/services/cookies'

export const Menu = () => {
    const dispatch = useDispatch();
    const hanldeMenuClick = (eve) => {
        eve.stopPropagation();
        dispatch({ type: "MENU", payload: false })
        if (eve?.target?.id === 'logout') {
            dispatch({ type: "AUTH", payload: { isLoggedIn: false, uid: '' } });
            sessionStorage.clear();
            AppCookie.clear();
        }
    }
    return (
        <div className={styles.menu}>
            {
                config?.map(({ path, label, id }) => {
                    return <Link onClick={hanldeMenuClick} id={id} href={path}>{label}</Link>
                })
            }
        </div>
    )
}
