import React from 'react'
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';


const SIDEBAR = () => {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <Link to ="/">
          <Button classname="w-100"><span className='icon'><MdDashboard />
          </span>DASHBOARD<span className='arrow'><IoIosArrowForward /></span>
          </Button>
          </Link>
        </li>
        <li>
        <Link to ="/product">
          <Button classname="w-100"><span className='icon'><FaProductHunt/>
          </span>PRODUCT<span className='arrow'><IoIosArrowForward /></span>
          </Button>
          </Link>
        </li>
        <li>
        <Link to ="/order">
          <Button classname="w-100"><span className='icon'><FaCartArrowDown />
          </span> ORDERS<span className='arrow'><IoIosArrowForward /></span>
          </Button>
          </Link>
        </li>
        <li>
        <Link to ="/review">
          <Button classname="w-100"><span className='icon'><MdMessage />
          </span>MESSAGE<span className='arrow'><IoIosArrowForward /></span>
          </Button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SIDEBAR;
