import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../App';
import axios from 'axios';

const Profile = () => {
  const { token, isLogin } = useContext(MyContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/customer/me', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLogin) {
      fetchUserInfo();
    }
  }, [isLogin, token]);

  if (loading) {
    return <div>Loading...</div>;
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
