import React, { useState } from 'react';
import axios from 'axios';
import cash from '../IMAGE/CARD.webp';
import cart from '../IMAGE/CASH.webp';
import { Link, useNavigate } from 'react-router-dom';

const PAYMENT = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      orderId: Math.random().toString(36).substring(2, 15),
      paymentId: paymentMethod === 'card' ? 'card-' + Math.random().toString(36).substring(2, 15) : 'cash',
      ...billingDetails,
      status: 'Pending',
      productsLink: []
    };

    try {
      const response = await axios.post('http://localhost:4000/api/order', orderData);
      console.log('Order created:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleCancel = () => {
    setBillingDetails({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: ''
    });
    setCardDetails({
      cardNumber: '',
      expiryDate: '',
      cvc: ''
    });
    setPaymentMethod('card');
  };

  return (
    <form className="billing-payment-containerS" onSubmit={handleSubmit}>
      <div className="billing-address-card">
        <h2>Billing Address</h2>
        <h4>Personal Information</h4>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={billingDetails.name}
          onChange={handleInputChange}
          className="billing-input"
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={billingDetails.phone}
          onChange={handleInputChange}
          className="billing-input"
        />
        <h4>Address Information</h4>
        <input
          type="text"
          placeholder="Street Address"
          name="address"
          value={billingDetails.address}
          onChange={handleInputChange}
          className="billing-input"
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={billingDetails.city}
          onChange={handleInputChange}
          className="billing-input"
        />
        <input
          type="text"
          placeholder="State/Province"
          name="state"
          value={billingDetails.state}
          onChange={handleInputChange}
          className="billing-input"
        />
        <input
          type="text"
          placeholder="Zip Code"
          name="zip"
          value={billingDetails.zip}
          onChange={handleInputChange}
          className="billing-input"
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={billingDetails.country}
          onChange={handleInputChange}
          className="billing-input"
        />
      </div>
      <div className="payment-containerS">
        <h2>Payment Details</h2>
        <div className="payment-methodS">
          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <img src={cash} alt="Card Logo" className="payment-logo" />
            Pay with Card
          </label>
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            <img src={cart} alt="Cash Logo" className="payment-logo" />
            Pay with Cash
          </label>
        </div>
        {paymentMethod === 'card' && (
          <div className="card-info">
            <p>Please enter your card details below.</p>
            <input
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              className="billing-input"
            />
            <div className="card-details-row">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardInputChange}
                className="card-input-small"
              />
              <input
                type="text"
                placeholder="CVC"
                name="cvc"
                value={cardDetails.cvc}
                onChange={handleCardInputChange}
                className="card-input-small"
              />
            </div>
          </div>
        )}
        {paymentMethod === 'cash' && (
          <div className="cash-payment">
            <p>You have selected to pay with cash.</p>
          </div>
        )}
        <div className="payment-buttons">
          <Link to="/sucess" className='pay'>
            <button type="submit" className="submit-button">
              Submit Payment
            </button>
          </Link>
          <Link to="/" className='pay'>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PAYMENT;
