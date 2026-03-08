import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const NAVIGATIONBAR = () => {
    return (
        <div>
            <nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-2 navPart1'>
                        </div>
                        <div className='col-sm-10 navPart2 d-flex align-items-center'>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'><Link to='/'>HOME</Link></li>
                                <li className='list-inline-item'><Link to='/grocery'>GROCERY</Link>
                                    <div className='submenu shadow'>
                                        <Link to="/grocery"><Button>DALS</Button></Link>
                                        <Link to="/grocery"><Button>DRY FRUITS</Button></Link>
                                        <Link to="/grocery"><Button>SPICES</Button></Link>
                                    </div>
                                </li>
                                <li className='list-inline-item'><Link to='/dairy'>DAIRY&BEVERAGES</Link>
                                    <div className='submenu shadow'>
                                        <Link to="/dairy"><Button>DAIRY</Button></Link>
                                        <Link to="/dairy"><Button>BEVERAGES</Button></Link>
                                    </div>
                                </li>
                                <li className='list-inline-item'><Link to='/packed'>PACKAGED FOOD</Link>
                                    <div className='submenu shadow'>
                                        <Link to="/packed"><Button>BISCUITS&COOKIES</Button></Link>
                                        <Link to="/packed"><Button>CEREALS</Button></Link>
                                        <Link to="/packed"><Button>KETCUP&SAUCE</Button></Link>
                                    </div>
                                </li>
                                <li className='list-inline-item'><Link to='/personal'>PERSONAL CARE</Link>
                                    <div className='submenu shadow'>
                                        <Link to="/personal"><Button>SKIN CARE</Button></Link>
                                        <Link to="/personal"><Button>HAIR CARE</Button></Link>
                                        <Link to="/personal"><Button>FACE CARE</Button></Link>
                                    </div>
                                </li>
                                <li className='list-inline-item'><Link to='/contact'>CONTACT US</Link></li>
                                <li className='list-inline-item'><Link to='/aboutus'>ABOUT US</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NAVIGATIONBAR
