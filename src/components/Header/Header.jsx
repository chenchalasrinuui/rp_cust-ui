import React from 'react'
import styles from './Header.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
export const Header = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box sx={{ fontSize: '50px', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, textAlign: 'center' }}>
                    Customer Portal
                </Box>
            </Grid>
        </Grid>
    )
}

