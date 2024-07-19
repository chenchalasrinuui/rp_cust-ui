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
import { useDispatch } from 'react-redux'
export const Products = () => {
    const dispatch = useDispatch()
    const [productsList, setProductsList] = useState([])
    const [serachProduct, setSearchProducts] = useState([]);
    const fnGetProducts = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendGetReq("cust/getProducts")
            console.log(res);
            setProductsList(res.data);
            setSearchProducts(res.data);
        } catch (ex) {
            console.error(ex)
            setProductsList([])
        }
        finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        fnGetProducts();
    }, [])

    const handleSearch = (eve) => {
        const filteredItems = productsList?.filter((obj) => {
            return obj?.name?.includes(eve.target.value);
        })
        setSearchProducts(filteredItems)
    }
    return (
        <div>
            <Search handleSearch={handleSearch} />
            <div className={styles.productsList}>
                {
                    serachProduct?.length > 0 ? serachProduct?.map(({ name, cost, path }, index) => {
                        return <Card className="product-card" sx={{ width: 200 }}>
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
                        :
                        <h1>No  Products Found.</h1>
                }
            </div>
        </div>
    )
}
