import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useCart } from '../CartContext'; // Import the useCart hook
import home from '../IMAGE/PACKED FOOD/banner.webp';
import Chocos from "../IMAGE/PACKED FOOD/Chocos.jpg"
import corn from "../IMAGE/PACKED FOOD/CornFlask.jpg"
import oats from "../IMAGE/PACKED FOOD/Oats.jpg"
import cookie from '../IMAGE/PACKED FOOD/cookie.jpg'
import dark from '../IMAGE/PACKED FOOD/darkfanasty.jpg'
import hide from '../IMAGE/PACKED FOOD/hide&seek.jpg'
import kissan from '../IMAGE/PACKED FOOD/kissan.jpg'
import homechef from '../IMAGE/PACKED FOOD/homechef.jpg'

const PACKED = () => {
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
            name: "Kellogg's Chocos: 1.10 kgs",
            price: 390,
            img: Chocos,
            rating: 4.5,
            description: "Delicious chocolate-flavored cereal."
        },
        {
            id: 2,
            name: "Kellogg's Corn Flakes Original: 1 kg",
            price: 425,
            img: corn,
            rating: 4,
            description: "Crispy corn flakes, perfect for breakfast."
        },
        {
            id: 3,
            name: "Saffola Masala Oats Classic: 500 gm",
            price: 175,
            img: oats,
            rating: 4,
            description: "Tasty and healthy masala oats."
        },
        {
            id: 4,
            name: "Karachi Fruit Biscuits",
            price: 125,
            img: cookie,
            rating: 4.5,
            description: "Soft and chewy fruit biscuits."
        },
        {
            id: 5,
            name: "Sunfeast Dark Fantasy Choco Chip Cookies",
            price: 85,
            img: dark,
            rating: 4,
            description: "Irresistible chocolate chip cookies."
        },
        {
            id: 6,
            name: "Parle Hide & Seek Chocolate Chip Cookie",
            price: 99,
            img: hide,
            rating: 4,
            description: "Crunchy cookies with chocolate chips."
        },
        {
            id: 7,
            name: "Kissan Tomato Ketchup",
            price: 101,
            img: kissan,
            rating: 4.5,
            description: "Delicious tomato ketchup."
        },
        {
            id: 8,
            name: "Home Chef Tomato Ketchup",
            price: 80,
            img: homechef,
            rating: 4,
            description: "Tasty tomato ketchup for all your dishes."
        }
    ];

    return (
        <div>
            <div className='homeBannerSection'>
                <div className='item'>
                    <img src={home} alt="img" className='w-100' height={460} />
                </div>
            </div>
            <div><br />
                <h4>BREAKFAST CEREAL</h4>
            </div>
            <hr />
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

export default PACKED;
