import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='searchbox position-relative d-flex align-items-center'>
        <CiSearch className='mr-2'/>
        <input type='text' placeholder='QUICK SEARCH' />
    </div>
  )
}

export default Search
