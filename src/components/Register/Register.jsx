"use client"
import React, { useState } from 'react'
import config from './configuration.json'
import Input from '../reusableComponents/inputControls/Input'
import Button from '../reusableComponents/inputControls/Button'
import { fieldLevelValidation, formLevelValidation, clearFormData } from '@/services/validations'
import Link from 'next/link'
import { Ajax } from '@/services/ajax'
import { useDispatch } from 'react-redux'

export const Register = () => {
    const [formControls, setFormControls] = useState(config)
    const dispatch = useDispatch();
    const handleClick = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendPostReq("cust/register", { data: dataObj });
            const { acknowledged, insertedId } = res?.data;
            if (acknowledged && insertedId) {
                alert('success')
                clearFormData(formControls, setFormControls);
            } else {

            }

        } catch (ex) {
            console.error("Login.tsx", ex)
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }

    const handleChange = (eve) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-4'>Register</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <Button handleClick={handleClick} > Register</Button>
                    <Link className='ms-3' href="login">Login</Link>
                </div>
            </div>
        </div>
    )
}


