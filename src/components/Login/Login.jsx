"use client"
import React, { useState } from 'react'
import config from './configuration.json'
import Input from '../reusableComponents/inputControls/Input'
import Button from '../reusableComponents/inputControls/Button'
import { fieldLevelValidation, formLevelValidation } from '@/services/validations'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Ajax } from '@/services/ajax'
import { useRouter } from 'next/navigation'
import { AppCookie } from '@/services/cookies'

export const Login = () => {
    const [formControls, setFormControls] = useState(config)
    const dispatch = useDispatch();
    const router = useRouter();
    const handleClick = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendPostReq("cust/login", { data: dataObj });
            const { token, _id, uid } = res?.data?.data
            if (token) {
                sessionStorage.setItem("token", token)
                AppCookie.setCookies("token", token);
                AppCookie.setCookies("id", _id);
                AppCookie.setCookies("uid", uid);
                dispatch({ type: "AUTH", payload: { isLoggedIn: true, uid } })
                if (sessionStorage.pathName) {
                    router.push(sessionStorage.pathName)
                    sessionStorage.pathName = "";
                } else {
                    router.push('/')
                }
            } else {
                dispatch({
                    type: "TOASTER", payload: {
                        isShowToaster: true,
                        toasterMessage: "Please Checked Entered Uid or Pwd",
                        toasterBG: 'red'
                    }
                })
            }

        } catch (ex) {
            console.error("Login.tsx", ex)
            dispatch({ type: "AUTH", payload: { isLoggedIn: false, uid: '' } })
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }

    const handleChange = (eve) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-4'>Login</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <Button handleClick={handleClick} > Login</Button>
                    <Link className='ms-3' href="register">register</Link>
                </div>
            </div>
        </div>
    )
}


