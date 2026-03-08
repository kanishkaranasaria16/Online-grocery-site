import React from 'react'
import { Link } from 'react-router-dom'
import { LuPhoneCall } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const FOOTER = () => {
  return (
    <div>
        <footer>
            <div className='container'>
                <div className='row mt-5 linkWrap'>
                    <div className='col'> 
                        <h5>GROCERY</h5>
                        <ul>
                            <li><Link to="/">DALS</Link></li>
                            <li><Link to="/">DRY FRUITS</Link></li>
                            <li><Link to="/">SPIECES</Link></li>
                        </ul>          
                    </div>
                    <div className='col'> 
                        <h5>DAIRY & BEVERAGES</h5>
                        <ul>
                            <li><Link to="/">DAIRY</Link></li>
                            <li><Link to="/">BEVERAGES</Link></li>
                        </ul>          
                    </div>
                    <div className='col'> 
                        <h5>PACKED FOOD</h5>
                        <ul>
                            <li><Link to="/">BISCUITS&COOKIES</Link></li>
                            <li><Link to="/">CEREALS</Link></li>
                            <li><Link to="/">KETCUP&SAUCE</Link></li>
                        </ul>          
                    </div>
                    <div className='col'> 
                        <h5>PERSONAL ITEMS</h5>
                        <ul>
                            <li><Link to="/">SKIN CARE</Link></li>
                            <li><Link to="/">HAIR CARE</Link></li>
                            <li><Link to="/">FACE CARE</Link></li>
                        </ul>          
                    </div>
                </div>
                <div className='online'>
                </div>
                <div className='call'>
                    <p><LuPhoneCall />+91 9909902901
                    <FaInstagram className='online'/>
                    <FaSquareXTwitter className='online'/></p>
                </div>
                <div className='copyright mt-3 pt-3 pb-3'>
                    <p>Copyright 2024 @ GRANNY's STORE. All rights reserved.Powered by store</p>
                </div>
            </div>  
        </footer>
    </div>
  )
}

export default FOOTER
