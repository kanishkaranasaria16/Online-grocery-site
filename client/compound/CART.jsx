import React, { useEffect } from 'react';
import { useCart } from '../CartContext';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const CART = () => {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signIn');
        }
    }, [isLoggedIn, navigate]);

    const handleQuantityChange = (id, change) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, change } });
    };

    const handleRemoveItem = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const calculateSubtotal = () => {
        return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleProceedToPay = () => {
        if (isLoggedIn) {
            console.log("Proceeding to payment...");
        } else {
            navigate('/signIn');
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {state.cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>Rs. {item.price}</td>
                                    <td>
                                        <Button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</Button>
                                        {item.quantity}
                                        <Button onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                                    </td>
                                    <td>Rs. {item.price * item.quantity}</td>
                                    <td>
                                        <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Card variant="outlined" style={{ marginTop: '20px' }}>
                        <CardContent>
                            <Typography variant="h5">Subtotal</Typography>
                            <Typography variant="h6">Rs. {calculateSubtotal()}</Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={{ marginTop: '10px' }} 
                                onClick={handleProceedToPay}
                            >
                                <Link to={isLoggedIn ? "/payment" : "/signIn"} className='pay'>
                                    Proceed to Pay
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CART;
