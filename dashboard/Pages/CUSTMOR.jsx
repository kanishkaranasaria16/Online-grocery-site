import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/customer');
                setCustomers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred while fetching customers');
            } finally {
                setLoading(false);
            }
        };

        fetchAllCustomers();
    }, []);

    const handleDeleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/customer/${id}`);
            // Update the state after successful deletion
            setCustomers(customers.filter((customer) => customer.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while deleting the customer');
        }
    };

    if (loading) {
        return <div className="loading">Loading customers...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="customers-list">
            <h2>All Customers</h2>
            {customers.length === 0 ? (
                <p>No customers found.</p>
            ) : (
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id} className="customer-item">
                            <h3>{customer.name}</h3>
                            <p><strong>Phone:</strong> {customer.phone}</p>
                            <p><strong>Email:</strong> {customer.email}</p>
                            <p><strong>Address:</strong> {customer.address}</p>
                            <p><strong>ID:</strong> {customer.id}</p>
                            <button onClick={() => handleDeleteCustomer(customer.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerDetails;
