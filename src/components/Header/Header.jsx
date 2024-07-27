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
export const Header = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, uid, isShowMenu } = useSelector((state) => {
        const { isLoggedIn, uid, isShowMenu } = state.appReducer
        return { isLoggedIn, uid, isShowMenu }
    })
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
                        <Avatar onClick={handleClick} sx={{ cursor: 'pointer', bgcolor: deepOrange[500], position: 'absolute', top: '40px', right: '20px' }}>{uid?.slice(0, 1)}</Avatar>
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

