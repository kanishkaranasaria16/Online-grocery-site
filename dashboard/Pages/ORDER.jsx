import React, { useEffect, useState } from 'react';
import './order.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="order-table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Payment Id</th>
            <th>Products</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Status</th>
            <th>Product List</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.paymentId}</td>
              <td>
                {Array.isArray(order.products) 
                  ? order.products.map(product => product.name).join(', ') 
                  : 'No products available.'}
              </td>
              <td>{order.name}</td>
              <td>
                <span role="img" aria-label="phone">
                  📞
                </span>{' '}
                {order.phoneNumber}
              </td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="outlined" onClick={() => handleOpen(order)}>
                  View Product List
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <p><strong>Order Id:</strong> {selectedOrder.orderId}</p>
              <p><strong>Payment Id:</strong> {selectedOrder.paymentId}</p>
              <p><strong>Name:</strong> {selectedOrder.name}</p>
              <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <ul>
                {Array.isArray(selectedOrder.products) ? (
                  selectedOrder.products.map((product, index) => (
                    <li key={index}>
                      {product.name} - Quantity: {product.quantity}
                    </li>
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderTable;
