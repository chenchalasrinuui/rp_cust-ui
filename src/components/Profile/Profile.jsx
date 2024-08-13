"use client"
import React, { useEffect, useRef, useState } from 'react'
import config from './configuration.json';
import Input from '../reusableComponents/inputControls/Input';
import Button from '../reusableComponents/inputControls/Button';
import { formLevelValidation, fieldLevelValidation, setDataToForm } from '@/services/validations';
import { AppCookie } from '@/services/cookies';
import { useDispatch } from 'react-redux';
import { Ajax } from '@/services/ajax';
import { handleToaster } from '@/services/functions';
import Image from 'next/image';
import styles from './Profile.module.css'

export const Profile = () => {

    const [formControls, setFormControls] = useState(config)
    const [selProfilePic, setSelProfilePic] = useState('')
    const dispatch = useDispatch();
    const fileUploadRef = useRef();
    const getUserInfo = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const id = await AppCookie.getCookie('id')
            const res = await Ajax.sendGetReq(`cust/getCustomerById?id=${id}`);
            setSelProfilePic(res?.data?.image)
            setDataToForm(formControls, setFormControls, res?.data || {})
        } catch (ex) {
            console.log("profile", ex)
        } finally {
            dispatch({ type: "LOADER", payload: false })

        }

    }
    useEffect(() => {
        getUserInfo();
    }, [])

    const handleChange = (eve) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }

    const handleClick = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            dispatch({ type: "LOADER", payload: true })
            const id = await AppCookie.getCookie('id')
            if (selProfilePic) {
                dataObj.image = selProfilePic
            }
            const res = await Ajax.sendPutReq(`cust/updateProfile?id=${id}`, { data: dataObj });
            const { acknowledged, modifiedCount } = res?.data;
            if (acknowledged && modifiedCount) {
                dispatch({ type: "AUTH", payload: { image: dataObj.image } })

                handleToaster(dispatch, "Profile Updated", "green")
            } else {
                handleToaster(dispatch, "Not Updated", "red")
            }

        } catch (ex) {
            console.error("Profile", ex)
            handleToaster(dispatch, "something went wrong", "red")
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    const handleProfileImageClick = () => {
        fileUploadRef.current.click();
    }
    const handleProfileImageChange = (eve) => {
        const file = eve?.target?.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelProfilePic(reader.result);
        }


    }
    return (
        <div className='container-fluid'>
            <div className='text-center my-3'>
                <Image className={styles.selProfile} onClick={handleProfileImageClick} name="profile" width={100} height={100} src={selProfilePic || "/profileupload.jpg"} />
                <input onChange={handleProfileImageChange} ref={fileUploadRef} className={styles.profile} type="file" />
            </div>

            <h3 className='text-center my-4'>Profile</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <Button handleClick={handleClick} > Save</Button>
                </div>
            </div>
        </div>
    )
}
