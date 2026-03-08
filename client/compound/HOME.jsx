import React, { useState } from 'react';
import BANNER from './BANNER';
import img1 from '../IMAGE/DAIRY/Milk.jpg';
import img2 from '../IMAGE/GROCERY/ChannaDal.jpg';
import img3 from '../IMAGE/DAIRY/WaghBahkri.jpg';
import Rating from '@mui/material/Rating';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { useCart } from '../CartContext'; // Import the useCart hook

const HOME = () => {
    const { dispatch } = useCart(); // Get the dispatch function from context
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Function to add product to the cart
    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        setSnackbarMessage(`${product.name} has been added to your cart!`);
        setSnackbarOpen(true);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const products = [
        {
            id: 1,
            name: 'Amul Taaza Toned Milk',
            price: 699,
            img: img1,
            rating: 4.5,
            description: "Fresh and pure toned milk from Amul."
        },
        {
            id: 2,
            name: 'Tata Sampann Chana Dal',
            price: 599,
            img: img2,
            rating: 4,
            description: "High-quality chana dal for your recipes."
        },
        {
            id: 3,
            name: 'Wagh Bakri Premium',
            price: 499,
            img: img3,
            rating: 4,
            description: "Premium tea blend for an exquisite taste."
        }
    ];

    return (
        <div>
            <BANNER />
            <section className='homeProducts'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='banner'>
                                <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/banner-box.jpg" alt="img" className='cursor' />
                            </div>
                        </div>
                        <div className='col-md-9 productRow'>
                            <div className='d-flex align-items-center'>
                                <div className='info'>
                                    <h3 className='hd'>BEST SELLERS</h3>
                                </div>
                            </div>
                            <div className='product_row'>
                                {products.map(product => (
                                    <div className='item productItem' key={product.id}>
                                        <div className='imgWrapper center'>
                                            <img src={product.img} alt={product.name} className='img1' width={200} height={200} />
                                        </div>
                                        <h4 className='text'>{product.name}</h4>
                                        <span className='stock'>INSTOCK</span>
                                        <div className='rating'>
                                            <span><Rating name="read-only" value={product.rating} readOnly /></span>
                                        </div>
                                        <p className='rate'>Rs.{product.price}/-</p>
                                        <Button className='detail btn-blue' onClick={() => handleAddToCart(product)}>
                                            ADD TO CART
                                        </Button>
                                        <Button className='detail btn-blue' onClick={() => handleOpenModal(product)}>
                                            VIEW DETAILS
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for View Details */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{selectedProduct?.name}</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <>
                            <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '100%', height: 'auto' }} />
                            <p>{selectedProduct.description}</p>
                            <p>Price: Rs.{selectedProduct.price}/-</p>
                            <Rating name="read-only" value={selectedProduct.rating} readOnly />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                    <Button onClick={() => { handleAddToCart(selectedProduct); handleCloseModal(); }} color="primary">
                        Add to Cart
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Snackbar will automatically hide after 3 seconds
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default HOME;
