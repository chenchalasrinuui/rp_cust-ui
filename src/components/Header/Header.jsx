import React from 'react'
import styles from './Header.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
export const Header = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>

                <Box sx={{ fontSize: '50px', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, textAlign: 'center' }}>
                    <Link href="/" className='float-start'>
                        <Image src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="My Logo" width={50} height={50} />
                    </Link>
                    Customer Portal
                </Box>
            </Grid>
        </Grid>
    )
}

