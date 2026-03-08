import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../App';
import axios from 'axios';

const Profile = () => {
  const { token, isLogin } = useContext(MyContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/customer/me', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setError('Failed to load user information.');
      } finally {
        setLoading(false);
      }
    };

    if (isLogin) {
      fetchUserInfo();
    } else {
      setLoading(false); 
    }
  }, [isLogin, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>No user information available.</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Phone: {userInfo.phone}</p>
      <p>Address: {userInfo.address}</p>
    </div>
  );
};

export default Profile;
