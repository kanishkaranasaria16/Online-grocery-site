import React, { useContext, useState } from 'react';
import Logo from '../IMAGE/LOGO.png';
import COUNTRY from './COUNTRY';
import { IoSearch } from "react-icons/io5";
import { Button } from '@mui/material';
import { PiShoppingCartFill } from "react-icons/pi";
import NAVIGATIONBAR from './NAVIGATIONBAR';
import { MyContext } from '../App';
import { Link } from 'react-router-dom';

const HEADER = () => {
  const context = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await fetch(`http://localhost:4000/api/products/search`);
        const data = await response.json();
        setSearchResults(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    } else {
      setSearchResults([]);
    }
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className='headerWrapper'>
        <div className='header'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='logoWrapper d-flex align-items-center col-sm-2'>
                <img src={Logo} alt='logo' />
              </div>
              <div className='col-sm-10 d-flex align-item-center part2'>
                {context.countryList.length !== 0 && <COUNTRY />}
                <div className='headerSearch ml-3 mr-3'>
                  <input 
                    type='text' 
                    placeholder='SEARCH FOR PRODUCT...' 
                    value={searchTerm} 
                    onChange={handleInputChange} 
                    onKeyPress={handleKeyPress} 
                  />
                  <Button onClick={handleSearch}><IoSearch /></Button>
                </div>
                <div className='part3 d-flex align-items-center login'>
                  {!context.isLoggedIn ? (
                    <Link to="/signIn">
                      <Button className='btn-blue' onClick={context.toggleLogin}>SIGN-IN</Button>
                    </Link>
                  ) : (
                    <>
                      <span className='username'>{context.username}</span>
                      <Button className='btn-red' onClick={context.toggleLogin}>LOGOUT</Button>
                    </>
                  )}
                  <div className='ml-auto cardTab'>
                    <Link to="/cart">
                      <Button className='circle mr-3'><PiShoppingCartFill /></Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <NAVIGATIONBAR />
        </div>
      </div>
      <div className='searchResults'>
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <div key={product.id} className='searchResultItem'>
              {product.name}
            </div>
          ))
        ) : (
          searchTerm && <div>No results found for "{searchTerm}"</div>
        )}
      </div>
    </div>
  );
}

export default HEADER;
