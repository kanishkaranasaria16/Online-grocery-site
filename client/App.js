import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HOME from './COMPOUND/HOME';
import HEADER from './COMPOUND/HEADER';
import axios from 'axios';
import DAIRY from './COMPOUND/DAIRY';
import GROCERY from './COMPOUND/GROCERY';
import PACKED from './COMPOUND/PACKED';
import PERSONAL from './COMPOUND/PERSONAL';
import CART from './COMPOUND/CART';
import ContactUs from './COMPOUND/CONTACTUS';
import AboutUs from './COMPOUND/ABOUTUS';
import PRODUCTLIST from './PAGES/PRODUCTLIST';
import FOOTER from './COMPOUND/FOOTER';
import SIGNIN from './PAGES/SIGNIN';
import SIGNUP from './PAGES/SIGNUP';
import PAYMENT from './PAGES/PAYMENT';
import { CartProvider } from './CartContext';
import SuccessPage from './PAGES/SUCESS';

const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isHeaderFooterShow, setHeaderFooterShow] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    await axios.get(url).then((res) => {
      setCountryList(res.data.data);
      console.log(res.data.data);
    });
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const values = {
    countryList,
    selectedCountry,
    setSelectedCountry,
    selectCountry: (country) => {
      setSelectedCountry(country);
    },
    setHeaderFooterShow,
    isLoggedIn,
    toggleLogin,
  };

  // Protected Route Component defined within the same file
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/signIn" />;
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          {isHeaderFooterShow && <HEADER />}
          <Routes>
            <Route path='/' exact element={<HOME />} />
            <Route path='/dairy' exact element={<DAIRY />} />
            <Route path='/grocery' exact element={<GROCERY />} />
            <Route path='/packed' exact element={<PACKED />} />
            <Route path='/personal' exact element={<PERSONAL />} />
            <Route path='/product/:id' exact element={<PRODUCTLIST />} />
            <Route path='/signIn' exact element={<SIGNIN />} />
            <Route path='/payment' exact element={<PAYMENT />} />
            <Route path='/signUp' exact element={<SIGNUP />} />
            <Route path='/contact' exact element={<ContactUs />} />
            <Route path='/aboutus' exact element={<AboutUs />} />
            <Route path='/sucess' exact element={<SuccessPage />} />
            <Route path='/cart' element={<ProtectedRoute element={<CART />} />} /> {/* Use ProtectedRoute here */}
          </Routes>
          {isHeaderFooterShow && <FOOTER />}
        </MyContext.Provider>
      </BrowserRouter>
    </CartProvider>
  ); 
}

export default App;
export { MyContext };
