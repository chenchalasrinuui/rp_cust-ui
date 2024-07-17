import React from 'react'
import styles from './Footer.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
export const Footer = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box data-testid="footer" position="fixed" bottom={0} sx={{ width: '100%', fontSize: '20px', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, textAlign: 'center' }}>
                    &copy; rights  belongs to NIT.
                </Box>
            </Grid>
        </Grid>
    )
}

