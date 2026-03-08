import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { Modal, Snackbar, Alert } from '@mui/material';
import Rating from '@mui/material/Rating';

const PRODUCT = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setOpenView(true);
    };

    const handleCloseView = () => {
        setOpenView(false);
        setSelectedProduct(null);
    };

    const handleEditProduct = (product) => {
        setEditData(product);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditData(null);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:4000/api/products/${id}`);
                setProducts(products.filter(product => product._id !== id)); // Remove the deleted product from the state
                setSnackbarMessage("Product deleted successfully!");
                setSnackbarSeverity("success");
            } catch (error) {
                console.error('Error deleting product:', error);
                setSnackbarMessage("Error deleting product");
                setSnackbarSeverity("error");
            } finally {
                setSnackbarOpen(true); 
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in editData) {
                formData.append(key, editData[key]);
            }

            await axios.put(`http://localhost:4000/api/products/${editData._id}`, formData);
            const updatedProducts = products.map(product => product._id === editData._id ? editData : product);
            setProducts(updatedProducts);
            setSnackbarMessage("Product updated successfully!");
            setSnackbarSeverity("success");
            handleCloseEdit();
        } catch (error) {
            console.error('Error updating product:', error);
            setSnackbarMessage("Error updating product");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setEditData({ ...editData, images: imageUrls });
    };

    const filteredProducts = products.filter(product => 
        (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(search.toLowerCase())) ||
        (product.brands && product.brands.toLowerCase().includes(search.toLowerCase()))
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className='card shadow border-0'>
            <div className='row cardfilter'>
                <div className='col md-3'>
                    <h4>SEARCH</h4>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='w-100'>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search product..."
                            className="form-control"
                        />
                    </FormControl>
                </div>
            </div>

            <div className='table-responsive mt-3'>
                <table className='table table-bordered'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>UID</th>
                            <th>PRODUCT</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>PRICE</th>
                            <th>STOCK</th>
                            <th>RATING</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1 + (currentPage - 1) * productsPerPage}</td>
                                <td onClick={() => handleViewProduct(product)} style={{ cursor: 'pointer' }}>
                                    <div className='d-flex productbox'>
                                        <div className='info'>
                                            <h6>{product.name}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.category}</td>
                                <td>{product.brands}</td>
                                <td>
                                    <del className='old'>{product.Oldprice}</del><br />
                                    <span className='new'>{product.price}</span>
                                </td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <Rating value={product.rating} readOnly />
                                </td>
                                <td>
                                    <div className='actions d-flex align-items-center v-align'>
                                        <Button 
                                            className='error' 
                                            color="error" 
                                            onClick={() => handleDeleteProduct(product._id)}>
                                            <FaTrash />
                                        </Button>
                                        <Button 
                                            className='edit' 
                                            color="primary" 
                                            onClick={() => handleEditProduct(product)}>
                                            <FaEdit />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/productupdate">
                <Button className='add'><h4>ADD PRODUCT</h4></Button>
            </Link>

            <div className='page'>
                <Pagination 
                    count={Math.ceil(filteredProducts.length / productsPerPage)} // Total pages
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary" 
                />
            </div>

            <Modal open={openView} onClose={handleCloseView}>
                <div className='modal-content'>
                    {selectedProduct && (
                        <>
                            <h2>{selectedProduct.name}</h2>
                            <p><strong>Description: </strong>{selectedProduct.description}</p>
                            <p>Category: {selectedProduct.category}</p>
                            <p>Brand: {selectedProduct.brands}</p>
                            <p>Price: <del>{selectedProduct.Oldprice}</del> <strong>{selectedProduct.price}</strong></p>
                            <p>Stock: {selectedProduct.countInStock}</p>
                            <p>Rating: 
                                <Rating 
                                    value={selectedProduct.rating}
                                    readOnly
                                    precision={0.5}
                                />
                            </p>

                            <div className="product-images">
                                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                    selectedProduct.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:4000${image}`} // Ensure the URL is correct
                                            alt={`${selectedProduct.name} - ${index + 1}`}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </Modal>

            <Modal open={openEdit} onClose={handleCloseEdit}>
                <div className='modal-content'>
                    <form onSubmit={handleEditSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                className='form-control'
                                value={editData?.name || ''}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='category'>Category</label>
                            <input
                                type='text'
                                id='category'
                                className='form-control'
                                value={editData?.category || ''}
                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='brands'>Brand</label>
                            <input
                                type='text'
                                id='brands'
                                className='form-control'
                                value={editData?.brands || ''}
                                onChange={(e) => setEditData({ ...editData, brands: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='price'>Price</label>
                            <input
                                type='number'
                                id='price'
                                className='form-control'
                                value={editData?.price || ''}
                                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='countInStock'>Stock</label>
                            <input
                                type='number'
                                id='countInStock'
                                className='form-control'
                                value={editData?.countInStock || ''}
                                onChange={(e) => setEditData({ ...editData, countInStock: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='Oldprice'>Old Price</label>
                            <input
                                type='number'
                                id='Oldprice'
                                className='form-control'
                                value={editData?.Oldprice || ''}
                                onChange={(e) => setEditData({ ...editData, Oldprice: e.target.value })}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='rating'>Rating</label>
                            <input
                                type='number'
                                id='rating'
                                className='form-control'
                                value={editData?.rating || ''}
                                onChange={(e) => setEditData({ ...editData, rating: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='images'>Images</label>
                            <input
                                type='file'
                                id='images'
                                className='form-control'
                                onChange={handleImageChange}
                                multiple
                            />
                        </div>

                        <Button type='submit' color="primary">Update Product</Button>
                    </form>
                </div>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PRODUCT;
