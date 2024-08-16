import React from 'react'
import styles from './Header.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Menu } from '../Menu/Menu';
import { CartButton } from '../CartButton/CartButton';
import { BASE_URL } from '@/services/ajax';
export const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state?.appReducer.isLoggedIn)
    const isShowMenu = useSelector((state) => state?.appReducer.isShowMenu)
    const uid = useSelector((state) => state?.appReducer.uid)
    const image = useSelector((state) => state?.appReducer.image)
    const handleClick = () => {
        dispatch({ type: "MENU", payload: !isShowMenu })
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>

                <Box sx={{ fontSize: '50px', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, textAlign: 'center' }}>
                    <Link href="/" className='float-start'>
                        <Image src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="My Logo" width={50} height={50} />
                    </Link>
                    Customer Portal
                    {isLoggedIn ? <>
                        <CartButton />
                        <Avatar onClick={handleClick} sx={{ cursor: 'pointer', bgcolor: deepOrange[500], position: 'absolute', top: '40px', right: '20px' }}>{image ? <Image src={`${BASE_URL}profilepics/${image}?time=${new Date()?.getTime()}`} alt="My Logo" width={50} height={50} /> : uid?.slice(0, 1)}</Avatar>
                        {isShowMenu && <Menu />}
                    </>
                        :
                        <Link href="/login" className={`float-end ${styles.login}`}>
                            Login
                        </Link>
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

