import React from 'react'
import styles from './Search.module.css'
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

export const Search = ({ handleSearch }) => {
    return (
        <Grid container>
            <Grid item xsOffset={4} xs={4}>
                <TextField onChange={handleSearch} fullWidth={100} id="product-search" label="Search Product" variant="standard" />
            </Grid>

        </Grid>
    )
}
