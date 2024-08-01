import React, { useEffect, useState, useRef } from 'react'
import styles from './Toaster.module.css'
import { useSelector, useDispatch } from 'react-redux'
export const Toaster = () => {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();
    const { toasterMessage, toasterBG } = useSelector((state) => {
        return state?.appReducer?.toaster
    })
    const intervalref = useRef()
    useEffect(() => {
        intervalref.current = setInterval(() => {
            setCount((prev) => {
                if (prev > 300) {
                    fnClear();
                }
                return prev + 1
            })
        }, 33)
    }, [])
    const fnHideToaster = () => {
        fnClear()
    }
    const fnClear = () => {
        clearInterval(intervalref.current)
        setCount(0);
        dispatch({
            type: "TOASTER",
            payload: {
                isShowToaster: false,
                toasterMessage: "",
                toasterBG: ''
            }
        })
    }
    return (
        <div className={styles.appToaster}>
            <div style={{ height: '50px' }}>
                <span className='ms-1'>{toasterMessage}</span>
                <b onClick={fnHideToaster}>X</b>
            </div>
            <div style={{ width: count, background: toasterBG }}></div>
        </div>
    )
}
