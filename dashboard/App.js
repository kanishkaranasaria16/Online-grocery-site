import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HOME from './Compounds/HOME';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HEADER from './Compounds/HEADER';
import SIDEBAR from './Compounds/SIDEBAR';
import LOGIN from './Pages/LOGIN';
import PRODUCT from './Pages/PRODUCT';
import UPDATE from './Pages/UPDATE';
import OrderTable from './Pages/ORDER';
import Review from './Pages/Review';
import CustomerDetails from './Pages/CUSTMOR';

const MyContext = createContext();

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isHide, setIsHide] = useState(true); // Start with hidden

  const values = {
    isLogin, 
    setLogin,
    isHide,
    setIsHide // Ensure setIsHide is included here
  };

  useEffect(() => {
    // Show or hide header and sidebar based on login status
    setIsHide(!isLogin);
  }, [isLogin]);

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          !isHide && <HEADER />
        }
        <div className='main d-flex'>
          {
            !isHide && 
            <div className='sidebarWrapper'>
              <SIDEBAR />
            </div>
          }
          <div className={`content ${isHide ? 'full' : ''}`}>
            <Routes>
              <Route path='/' element={isLogin ? <HOME /> : <Navigate to="/login" />} />
              <Route path='/login' element={<LOGIN />} />
              <Route path='/product' element={isLogin ? <PRODUCT /> : <Navigate to="/login" />} />
              <Route path='/productupdate' element={isLogin ? <UPDATE /> : <Navigate to="/login" />} />
              <Route path='/order' element={isLogin ? <OrderTable /> : <Navigate to="/login" />} />
              <Route path='/review' element={isLogin ? <Review /> : <Navigate to="/login" />} />
              <Route path='/custmor' element={isLogin ? <CustomerDetails /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
