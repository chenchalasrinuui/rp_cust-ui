import React from 'react'
import styles from './Button.module.css'
import Button from '@mui/material/Button';
import Link from 'next/link';

const MyButton = ({ handleClick, children }) => {
    return (
        <Button onClick={handleClick} variant="outlined">{children}</Button>

    )
}

export default MyButton
