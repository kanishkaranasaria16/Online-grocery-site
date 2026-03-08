import { Button } from '@mui/material';
import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

const QUANTITY = ({ value, onChange }) => {

  const minus = () => {
    onChange(value - 1);
  }

  const plus = () => {
    onChange(value + 1);
  }

  return (
    <div>
      <div className='quantityDrop d-flex align-items-center'>
        <Button onClick={minus}><RiSubtractFill/></Button>
        <input type='text' value={value} readOnly/>
        <Button onClick={plus}><IoMdAdd/></Button>
      </div>
    </div>
  )
}

export default QUANTITY