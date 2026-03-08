import React from 'react';
import './Order.css';  // Import the CSS file for styling

const OrderDetail = ({ order }) => {
  return (
    <div className="order-detail">
      <h2>Order #{order.id}</h2>
      <div className="order-info">
        <div className="customer-details">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
        </div>
        
        <div className="order-items">
          <h3>Items Ordered</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Total Items:</strong> {order.items.length}</p>
          <p><strong>Total Price:</strong> {order.totalPrice}</p>
          <p><strong>Order Date:</strong> {order.orderDate}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
