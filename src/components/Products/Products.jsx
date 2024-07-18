"use client"
import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { Ajax, VENDOR_BASE_URL } from '@/services/ajax'
import { Search } from '../Search'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const Products = () => {
    const [productsList, setProductsList] = useState([])
    const fnGetProducts = async () => {
        try {
            const res = await Ajax.sendGetReq("cust/getProducts")
            console.log(res);
            setProductsList(res.data);
        } catch (ex) {
            console.error(ex)
            setProductsList([])
        }
        finally {

        }
    }
    useEffect(() => {
        fnGetProducts();
    }, [])
    return (
        <div>
            <Search />
            <div className={styles.productsList}>
                {
                    productsList?.map(({ name, cost, path }, index) => {
                        return <Card sx={{ width: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={`${VENDOR_BASE_URL}${path}`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        cost: {cost}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    })
                }
            </div>
        </div>
    )
}
