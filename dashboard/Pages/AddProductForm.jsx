// AddProduct.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new product object
        const newProduct = {
            uid: Date.now(), // Using timestamp as a unique identifier
            name,
            description,
            category,
            brand,
            price: `$${price}`,
            stock,
            image: URL.createObjectURL(image), // Create a URL for the uploaded image
            rating: '0.0', // Default rating
            orders: '0', // Default orders
            sales: '0' // Default sales
        };

        // Call the onAddProduct function passed as props
        onAddProduct(newProduct);

        // Navigate back to the PRODUCT page after adding
        navigate('/');
    };

    return (
        <div className="card shadow border-0">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <TextField
                    label="Brand"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Stock"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Product
                </Button>
            </form>
        </div>
    );
};

export default AddProduct;
