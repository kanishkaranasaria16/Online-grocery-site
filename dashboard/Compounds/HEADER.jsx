import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/LOGO.png';
import Button from '@mui/material/Button';
import { IoMenuSharp } from "react-icons/io5";
import Search from './Search';
import { PiGlobeThin } from "react-icons/pi";
import { CiShoppingCart, CiMail, CiBellOn } from "react-icons/ci";
import { MyContext } from '../App';

const HEADER = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for sidebar visibility

  const handleLogout = () => {
    context.setLogin(false);
    context.setIsHide(true);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev); // Toggle sidebar visibility
  };

  return (
    <div>
      <header className='d-flex align-items-center'>
        <div className='container-fluid'>
          <div className='row d-flex align-items-center'>
            <div className='col-sm-2 part1'>
              <Link to={'./'}>
                <img src={logo} className='logo' alt='logo' />
              </Link>
            </div>
            <div className='col-sm-3 d-flex align-items-center part2 pl-4'>
              <Button onClick={toggleSidebar}> {/* Toggle sidebar on click */}
                <IoMenuSharp className='rounded-circle mr-3' />
              </Button>
              <Search />
            </div>
            <div className='col-sm-7 d-flex align-items-center justify-content-end part3 pl-4'>
              <Link to="/custmor">
                <Button>
                  <PiGlobeThin className='rounded-circle mr-3' />
                </Button>
              </Link>
              <Link to="/order">
                <Button>
                  <CiShoppingCart className='rounded-circle mr-3' />
                </Button>
              </Link>
              <Link to="/review">
                <Button>
                  <CiMail className='rounded-circle mr-3' />
                </Button>
              </Link>
              <Button>
                <CiBellOn className='rounded-circle mr-3' />
              </Button>
              {
                context.isLogin !== true ? (
                  <Link to={'/login'}>
                    <Button className='btn-blue btn-lg'> SIGN-IN </Button>
                  </Link>
                ) : (
                  <div>
                    <Button className='btn-red btn-lg'>
                      <span onClick={handleLogout}>LOGOUT</span>
                    </Button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HEADER;
