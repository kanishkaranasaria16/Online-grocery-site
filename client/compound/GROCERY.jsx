import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the useCart hook
import home from '../IMAGE/GROCERY/banner.webp';
import Channa from "../IMAGE/GROCERY/ChannaDal.jpg";
import Mooga from "../IMAGE/GROCERY/MoogaDl.jpg";
import Masoor from "../IMAGE/GROCERY/MasoorDal.jpg";
import almond from "../IMAGE/GROCERY/Almond.jpg";
import nut from '../IMAGE/GROCERY/CashewNut.jpg';
import pishta from '../IMAGE/GROCERY/Pishta.jpg';
import raisin from '../IMAGE/GROCERY/Raisin.jpg';
import sunflower from '../IMAGE/GROCERY/Sunflower.jpg';
import pumkin from '../IMAGE/GROCERY/Pumpkin.jpg';
import jeera from '../IMAGE/GROCERY/Jeera.jpg';
import chia from '../IMAGE/GROCERY/Chia.jpg';

const GROCERY = () => {
    const { dispatch } = useCart(); // Get the dispatch function from context
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
    };

    const products = [
        {
            id: 1,
            name: 'Tata Sampann Chana Dal',
            price: 72,
            img: Channa,
            rating: 4.5,
            description: "Chana dal is a staple in the Indian diet. It's nutritious and can be easily digested. Tata Sampann's Chana Dal has a rich flavour and aroma, and provides essential amino acids for complete protein. Used in a variety of soups, salads, sweets and savouries, chana dal is an essential in every household."
        },
        {
            id: 2,
            name: 'Tata Sampann Moong Dal',
            price: 175,
            img: Mooga,
            rating: 4,
            description: "Tata Sampann Organic Moong Dal is sourced from certified organic farms bringing 100% organic, unpolished pulses that retain their goodness and natural taste. Produced using environmentally responsible and sustainable agricultural approaches i.e. the absence of chemical fertilizers and pesticides, Tata Sampann Organic Moong Dal is an important source of proteins making all meals healthy and nutritious."
        },
        {
            id: 3,
            name: 'Tata Sampann Masoor Dal',
            price: 75,
            img: Masoor,
            rating: 4,
            description: "- Known to be one of the best natural sources of protein, Tata Sampann Whole Masoor Dal is unpolished, i.e. it does not undergo any artificial polishing with water, oil or leather, thereby retaining its goodness and protein content."
        },
        {
            id: 4,
            name: 'Nutraj California Almonds',
            price: 359,
            img: almond,
            rating: 4.5,
            description: "Crunchy almonds, perfect for snacking."
        },
        {
            id: 5,
            name: 'Nutraj Cashews',
            price: 519,
            img: nut,
            rating: 4,
            description: "Delicious cashews, great for cooking and snacking."
        },
        {
            id: 6,
            name: 'Nutraj Pista',
            price: 409,
            img: pishta,
            rating: 4,
            description: "High-quality pistachios, a healthy snack."
        },
        {
            id: 7,
            name: 'Wonderland Raisins',
            price: 132,
            img: raisin,
            rating: 4,
            description: "Sweet and chewy raisins, perfect for desserts."
        },
        {
            id: 8,
            name: 'Farmley Premium Sunflower Seeds',
            price: 73,
            img: sunflower,
            rating: 4.5,
            description: "Nutritious sunflower seeds, great for munching."
        },
        {
            id: 9,
            name: 'Nutraj Pumpkin Seeds',
            price: 89,
            img: pumkin,
            rating: 4,
            description: "Healthy pumpkin seeds, ideal for salads."
        },
        {
            id: 10,
            name: 'Gm Jeera',
            price: 199,
            img: jeera,
            rating: 4,
            description: "Essential spice for Indian cuisine."
        },
        {
            id: 11,
            name: 'Farmley Premium Chia Seeds',
            price: 119,
            img: chia,
            rating: 4,
            description: "Superfood chia seeds, great for smoothies."
        },
    ];

    return (
        <div>
            <div className='homeBannerSection'>
                <div className='item'>
                    <img src={home} alt="img" className='w-100' height={460} />
                </div>
            </div>
            <div className='product_row'>
                {products.map((product) => (
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
                        <Button 
                            className='detail btn-blue' 
                            onClick={() => handleAddToCart(product)} // Call handleAddToCart on button click
                        >
                            ADD TO CART
                        </Button>
                        <Button 
                            className='detail btn-blue' 
                            onClick={() => handleOpenModal(product)} // Call handleOpenModal on button click
                        >
                            VIEW DETAILS
                        </Button>
                    </div>
                ))}
            </div>

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
                    <Button 
                        onClick={() => { handleAddToCart(selectedProduct); handleCloseModal(); }} 
                        color="primary"
                    >
                        Add to Cart
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GROCERY;
