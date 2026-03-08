import React from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { IoMdClose } from "react-icons/io";
import Rating from '@mui/material/Rating';
import img from '../IMAGE/DAIRY/Milk.jpg'

const PRODUCTMODEL = (props) => {
    return (
        <div>
            <Dialog open={true} className='productModal' onClose={() => props.closeProductModel()}>
                <Button className='close_' onClick={() => props.closeProductModel()}><IoMdClose /></Button>
                <h4 className='md-1 font-weight-bold'>Amul Taaza Toned Milk</h4>
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center mr-4'>
                        <span>BRAND:</span>
                        <span className='amul'>AMUL</span>
                    </div>
                    <Rating name="read-only" value={5} size="small" precision={0.5} readOnly />
                </div>
                <hr />
                <br /><br />
                <div className='row mt-2 productDetailModel'>
                    <div className='col-md-5 image'>
                        <img src={img} alt='dairy' width={300} height={500} />
                    </div>
                    <div className='col-md-7'>
                        <div className='d-flex info align-items-center'>
                            <del className='strike'>Rs.600/-</del>
                            <p className='rate text-danger lg'>Rs.499/-</p>
                        </div>
                        <span className='stocks'>INSTOCK</span>
                        <h6><b>Overview:</b></h6>
                        <p>Amul milk is one of the most hygienic liquid milks available.It is pasteurized in state-of-the-art processing plants and pouch-packed for convenience.</p>
                        <h6><b>Ingredients:</b></h6>
                        <p>Toned Milk.</p>
                        <h6><b>Allergen advice:</b></h6><p>Contains milk.</p>
                        <h6><b>Storage Instructions:</b></h6>
                        <p>Store in a cool, dry and hygienic place.</p>
                        <h6><b>Best Before:</b></h6>
                        <p>5 months from manufacturing date.</p>
                        <div className='d-flex align-items-center'>
                            <Button className='btn-blue btn-lg btn-big btn-round'>ADD TO CART</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default PRODUCTMODEL
