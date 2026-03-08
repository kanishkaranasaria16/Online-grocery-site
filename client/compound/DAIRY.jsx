import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useCart } from '../CartContext'; // Import the useCart hook
import home from '../IMAGE/DAIRY/banner.webp';
import butter from "../IMAGE/DAIRY/butter.jpg";
import milk from "../IMAGE/DAIRY/Milk.jpg";
import panner from "../IMAGE/DAIRY/Panner.jpg";
import redlabel from "../IMAGE/DAIRY/RedLabel.jpg";
import cheese from '../IMAGE/DAIRY/Cheese.jpg';
import jivraj9 from '../IMAGE/DAIRY/Jivraj9.jpg';
import wagh from '../IMAGE/DAIRY/WaghBahkri.jpg';
import taj from '../IMAGE/DAIRY/TajMahal.jpg';

const DAIRY = () => {
    const { dispatch } = useCart(); // Get the dispatch function from context
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Function to add product to the cart
    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        alert(`${product.name} has been added to your cart!`);
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
            name: 'Wagh Bakri Premium Leaf Tea Pouch',
            price: 540,
            img: wagh,
            rating: 4.5,
            description: "A premium blend of leaf tea with rich flavor."
        },
        {
            id: 2,
            name: 'Jivraj No 9 Leaf Tea',
            price: 525,
            img: jivraj9,
            rating: 4,
            description: "Quality tea leaves sourced for the perfect brew."
        },
        {
            id: 3,
            name: 'Brooke Bond Red Label Tea',
            price: 473,
            img: redlabel,
            rating: 4,
            description: "A classic tea blend for a refreshing taste."
        },
        {
            id: 4,
            name: 'Taj Mahal Tea',
            price: 395,
            img: taj,
            rating: 4,
            description: "A premium quality tea known for its aroma."
        },
        {
            id: 5,
            name: 'Amul Taaza Toned Milk',
            price: 73,
            img: milk,
            rating: 4.5,
            description: "Fresh and pure toned milk from Amul."
        },
        {
            id: 6,
            name: 'Amul Malai Paneer (Frozen)',
            price: 89,
            img: panner,
            rating: 4,
            description: "Creamy and fresh paneer for your dishes."
        },
        {
            id: 7,
            name: 'Amul Processed Cheese Cubes',
            price: 299,
            img: cheese,
            rating: 4,
            description: "Delicious cheese cubes perfect for snacking."
        },
        {
            id: 8,
            name: 'Amul Butter',
            price: 285,
            img: butter,
            rating: 4,
            description: "Rich and creamy butter for your recipes."
        }
    ];

    return (
        <div>
            <div className='homeBannerSection'>
                <div className='item'>
                    <img src={home} alt="img" className='w-100' height={460} />
                </div>
            </div>
            <hr />
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
        </div>
    );
}

export default DAIRY;
