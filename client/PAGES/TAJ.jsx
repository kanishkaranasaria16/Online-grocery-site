import React from 'react'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import img from '../IMAGE/DAIRY/Milk.jpg'

const TAJ = () => {
  return (
    <div>
       <section className="productDetails section">
        <div className="container">
          <h4 className="md-1 font-weight-bold">Amul Malai Paneer (Frozen)</h4>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center mr-4">
              <span>BRAND:</span>
              <span className="amul">AMUL</span>
            </div>
            <Rating
              name="read-only"
              value={5}
              size="small"
              precision={0.5}
              readOnly
            />
          </div>
          <hr />
          <br />
          <br />
          <div className="row mt-2 productDetailModel">
            <div className="col-md-5 image">
              <img src={img} alt="dairy" width={300} height={500} />
            </div>
            <div className="col-md-7">
              <div className="d-flex info align-items-center">
                <del className="strike">Rs.100/-</del>
                <p className="rate text-danger lg">Rs.89/-</p>
              </div>
              <span className="stocks">INSTOCK</span>
              <h6>
                <b>Overview:</b>
              </h6>
              <p>
                Amul milk is one of the most hygienic liquid milks available.It
                is pasteurized in state-of-the-art processing plants and
                pouch-packed for convenience.
              </p>
              <h6>
                <b>Ingredients:</b>
              </h6>
              <p>Toned Milk.</p>
              <h6>
                <b>Allergen advice:</b>
              </h6>
              <p>Contains milk.</p>
              <h6>
                <b>Storage Instructions:</b>
              </h6>
              <p>Store in a cool, dry and hygienic place.</p>
              <h6>
                <b>Best Before:</b>
              </h6>
              <p>5 months from manufacturing date.</p>
              <div className="d-flex align-items-center">
                <Button className="btn-blue btn-lg btn-big btn-round">
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TAJ
