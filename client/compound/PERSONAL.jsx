import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import home from '../IMAGE/PERSONAL ITEM/banner.webp';
import plus from "../IMAGE/PERSONAL ITEM/ClinicPlus.jpg";
import oil from "../IMAGE/PERSONAL ITEM/Oil.jpg";
import conditioner from "../IMAGE/PERSONAL ITEM/DoveConditioner.jpg";
import dove from '../IMAGE/PERSONAL ITEM/Dove.jpg';
import peras from '../IMAGE/PERSONAL ITEM/Pears.jpg';
import santoor from '../IMAGE/PERSONAL ITEM/Santoor.jpg';
import fair from '../IMAGE/PERSONAL ITEM/Fair&Lovely.jpg';
import mama from '../IMAGE/PERSONAL ITEM/MamaEarth.jpg';
import pondas from '../IMAGE/PERSONAL ITEM/PondasFaceWas.jpg';

const PERSONAL = () => {
    const [cartItems, setCartItems] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
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
            name: "Clinic Plus Strong & Long Health Shampoo",
            price: 359,
            img: plus,
            rating: 4.5,
            description: "A strong and long health shampoo enriched with natural ingredients."
        },
        {
            name: "Dove Daily Shine Conditioner",
            price: 185,
            img: conditioner,
            rating: 4,
            description: "Conditioner that nourishes and enhances shine for daily use."
        },
        {
            name: "Parachute Advanced Jasmine Hair Oil",
            price: 79,
            img: oil,
            rating: 4,
            description: "Lightweight hair oil with jasmine essence for nourishment."
        },
        {
            name: "Dove Cream Beauty Bathing Bar : 4x125 gms",
            price: 308,
            img: dove,
            rating: 4.5,
            description: "Gentle cleansing bar enriched with cream for smooth skin."
        },
        {
            name: "Pears Pure & Gentle Bathing Bar : 4x125 gms",
            price: 256,
            img: peras,
            rating: 4,
            description: "Gentle and pure bathing bar suitable for all skin types."
        },
        {
            name: "Santoor Sandal & Turmeric Soap : 4x150 gms",
            price: 199,
            img: santoor,
            rating: 4,
            description: "Traditional soap enriched with sandalwood and turmeric."
        },
        {
            name: "Mamaearth Ubtan Face Wash For Tan Removal",
            price: 199,
            img: mama,
            rating: 4.5,
            description: "Face wash that helps in removing tan and brightening skin."
        },
        {
            name: "Glow & Lovely Facewash Instant Glow",
            price: 125,
            img: fair,
            rating: 4,
            description: "Facewash for an instant glow and brighter skin."
        },
        {
            name: "Pond's Bright Miracle Detox Facewash",
            price: 286,
            img: pondas,
            rating: 4,
            description: "Detoxifying facewash that cleanses and refreshes skin."
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
                {products.slice(0, 3).map((product, index) => (
                    <div className='item productItem' key={index}>
                        <div className='imgWrapper center'>
                            <img src={product.img} alt={`img${index}`} className='img1' width={200} height={200} />
                        </div>
                        <h4 className='text'>{product.name}</h4>
                        <span className='stock'>INSTOCK</span>
                        <div className='rating'>
                            <span><Rating name="read-only" value={product.rating} readOnly /></span>
                        </div>
                        <p className='rate'>Rs.{product.price}/-</p><br />
                        <Button className='detail btn-blue' onClick={() => addToCart(product)}>ADD TO CART</Button>
                        <Button className='detail btn-blue' onClick={() => handleOpenModal(product)}>VIEW DETAILS</Button>
                    </div>
                ))}
            </div>
            <div className='product_row'>
                {products.slice(3, 6).map((product, index) => (
                    <div className='item productItem' key={index}>
                        <div className='imgWrapper center'>
                            <img src={product.img} alt={`img${index}`} className='img1' width={200} height={200} />
                        </div>
                        <h4 className='text'>{product.name}</h4>
                        <span className='stock'>INSTOCK</span>
                        <div className='rating'>
                            <span><Rating name="read-only" value={product.rating} readOnly /></span>
                        </div>
                        <p className='rate'>Rs.{product.price}/-</p><br />
                        <Button className='detail btn-blue' onClick={() => addToCart(product)}>ADD TO CART</Button>
                        <Button className='detail btn-blue' onClick={() => handleOpenModal(product)}>VIEW DETAILS</Button>
                    </div>
                ))}
            </div>
            <div className='product_row'>
                {products.slice(6).map((product, index) => (
                    <div className='item productItem' key={index}>
                        <div className='imgWrapper center'>
                            <img src={product.img} alt={`img${index}`} className='img1' width={200} height={200} />
                        </div>
                        <h4 className='text'>{product.name}</h4>
                        <span className='stock'>INSTOCK</span>
                        <div className='rating'>
                            <span><Rating name="read-only" value={product.rating} readOnly /></span>
                        </div>
                        <p className='rate'>Rs.{product.price}/-</p><br />
                        <Button className='detail btn-blue' onClick={() => addToCart(product)}>ADD TO CART</Button>
                        <Button className='detail btn-blue' onClick={() => handleOpenModal(product)}>VIEW DETAILS</Button>
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
                    <Button onClick={() => { addToCart(selectedProduct); handleCloseModal(); }} color="primary">
                        Add to Cart
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PERSONAL;
