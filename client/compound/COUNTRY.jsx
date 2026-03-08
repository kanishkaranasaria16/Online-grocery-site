import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { MdOutlineArrowDropDown } from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import { IoMdClose } from "react-icons/io";
import { MyContext } from '../App';

const COUNTRY = () => {
    const [isOpenModule,setisOpenModule] = useState(false);
    const[selectTab,setselectedTab]= useState(null);
    const context = useContext(MyContext)
    const selectCountry=(index,country)=>{
        setselectedTab(index);
        setisOpenModule(false);
        context.selectCountry(country)
    }

    return (
        <div>
            <Button className='countrydrop ' onClick={()=>setisOpenModule(true)}>
                <div className='info d-flex flex-column'>
                    <span className='lable'>YOUR LOCATION</span>
                    <span className='name'>{context.selectedCountry !=="" ? context.selectedCountry : 'Select Loaction'}</span>
                </div>
                <span className='ml-auto'><MdOutlineArrowDropDown /></span>
            </Button>
            <Dialog open={isOpenModule} className='location' onClose={()=>setisOpenModule(false)}>
                <h5>Choose your delivery loaction</h5>
                <p>Enter your address and we will specify the offer for your area</p>
                <Button className='close'onClick={()=>setisOpenModule(false)}><IoMdClose /></Button>
                <ul className='countryList'>
                    {
                        context.countryList?.lenght!==0 && context.countryList?.map((item,index)=>{
                            return(
                                <li key={index}><Button onClick={()=>selectCountry(index,item.country)}
                                className={`${selectTab===index ? 'active' : ''}`}>
                                    {item.country}</Button></li>
                            )
                        })
                    }
                    
                </ul>
            </Dialog>
        </div>
    )
}

export default COUNTRY
