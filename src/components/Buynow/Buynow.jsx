'use client'
import React, { useEffect, useState } from 'react'
import styles from './Buynow.module.css'
import { Address } from '../Address/Address'
import { useDispatch } from 'react-redux'
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies'
import { handleToaster } from '@/services/functions'
import { useRouter } from 'next/navigation'

export const Buynow = (props) => {
    const [product, setProduct] = useState({})
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = props?.params

    const getProductDetails = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendGetReq(`cust/getProductById?id=${id}`)
            console.log(2222, res.data)
            setProduct(res?.data)
        } catch (ex) {
            console.error("BuyNow", ex)
            setProduct({})
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        getProductDetails();
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSaveOrder = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const id = await AppCookie.getCookie("id")
            const dataObj = { productId: product._id, uid: id }
            const res = await Ajax.sendPostReq('cust/save-order', { data: dataObj })
            const { acknowledged, insertedId, message } = res.data;
            if (acknowledged && insertedId) {
                handleToaster(dispatch, 'Order placed ', 'green')
                router.push('/orders')
            } else {
                handleToaster(dispatch, message, 'red')
            }
        } catch (ex) {
            console.error('BuyNow', ex)
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }

    const fnProceed = async () => {
        const options = {
            key: '', // Enter the Key ID generated from the Dashboard
            amount: (product.cost + 40) * 100,
            currency: "INR",
            name: 'nit',
            description: 'Purchase oirder',
            handler: function (response) {
                console.log(response)
                handleSaveOrder();
                alert('success')
            },
            modal: {
                ondismiss: function () {
                    alert('Transaction was not completed.');

                },
                onerror: function () {
                    alert("error")
                }
            },
            prefill: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: '9999999999',
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            alert('Payment failed!');
        });

    }
    return (
        <div className={styles.orderNow}>
            <Address />
            <div className='table-responsive'>
                <table className="table table-bordered" >
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product?.name}</td>

                            <td>{product.cost}</td>
                        </tr>
                        <tr>
                            <td>Charges</td>

                            <td>40</td>
                        </tr>
                        <tr>
                            <td><b>Grand Total:</b></td>
                            <td>{product?.cost + 40}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <button onClick={fnProceed} className='btn btn-primary'>Proceed</button>
                </p>
            </div>
        </div >
    )
}
