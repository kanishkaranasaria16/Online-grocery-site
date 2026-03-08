import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const PRODUCTUPDATE = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        brands: '',
        price: '',
        Oldprice: '',
        category: '',
        countInStock: '',
        rating: '',
        dateCreates: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/products/${id}`, product);
            navigate('/products'); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='edit-product'>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Brands"
                    name="brands"
                    value={product.brands}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Old Price"
                    name="Oldprice"
                    type="number"
                    value={product.Oldprice}
                    onChange={handleChange}
                />
                <TextField
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Count In Stock"
                    name="countInStock"
                    type="number"
                    value={product.countInStock}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Rating"
                    name="rating"
                    type="number"
                    value={product.rating}
                    onChange={handleChange}
                />
                <TextField
                    label="Date Created"
                    name="dateCreates"
                    type="date"
                    value={product.dateCreates}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </div>
    );
};

export default PRODUCTUPDATE;
