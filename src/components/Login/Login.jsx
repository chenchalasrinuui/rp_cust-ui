"use client"
import React, { useState } from 'react'
import config from './configuration.json'
import Input from '../reusableComponents/inputControls/Input'
import Button from '../reusableComponents/inputControls/Button'
import { fieldLevelValidation, formLevelValidation } from '@/services/validations'
import { AppCookie } from '@/services/cookies'
import { useAppCtx as useAppContext } from '@/context/appContext'
import Link from 'next/link'
export const Login = () => {
    const [formControls, setFormControls] = useState(config)
    const { dispatch } = useAppContext();
    const handleClick = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;


        } catch (ex) {
            console.error("Login.tsx", ex)
        } finally {

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


