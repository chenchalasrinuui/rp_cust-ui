"use client"
import React, { useEffect, useState } from 'react'
import styles from './Address.module.css'
import { Popup } from '../reusableComponents/Popup/Popup'
import config from './configuration.json'
import { fieldLevelValidation, formLevelValidation, clearFormData } from '@/services/validations'
import Input from '../reusableComponents/inputControls/Input'
import { useDispatch } from 'react-redux'
import { Ajax } from '@/services/ajax'
import { handleToaster } from '@/services/functions'
export const Address = () => {

    const [formControls, setFormControls] = useState(config)
    const [addressList, setAddressList] = useState([])
    const [isShowPopup, setIsShowPopup] = useState(false)
    const dispatch = useDispatch();
    const getAddresssList = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendGetReq("cust/addressList");
            setAddressList(res?.data)
        } catch (ex) {
            setAddressList([]);
            handleToaster(dispatch, ex.message, "green")
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }

    useEffect(() => {
        getAddresssList();
    }, [])
    const handlePopup = () => {
        setIsShowPopup(!isShowPopup)
    }
    const handleFormSubmit = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            setIsShowPopup(false);
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendPostReq("cust/saveAddress", { data: dataObj });
            const { acknowledged, insertedId } = res?.data;
            if (acknowledged && insertedId) {
                getAddresssList();
                handleToaster(dispatch, "address saved", "green")
                clearFormData(formControls, setFormControls);
            } else {
                handleToaster(dispatch, "address not saved", "red")
            }
        } catch (ex) {
            console.error("Login.tsx", ex)
            handleToaster(dispatch, ex.message, "green")
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    const handleChange = (eve) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }

    return (
        <div>
            <button onClick={handlePopup} className='btn btn-primary'>Add Address</button>
            <div className="border p-3">
                {
                    addressList.map((obj, index) => {
                        return <p key={index}>
                            <input type="radio" name="address" /> {obj?.address}
                        </p>
                    })
                }
            </div>
            {
                isShowPopup && <Popup closePopup={handlePopup} handleFormSubmit={handleFormSubmit} >
                    {
                        formControls.map((obj, ind) => {
                            return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                        })
                    }
                </Popup>
            }
        </div>
    )
}
