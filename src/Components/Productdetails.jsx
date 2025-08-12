import React, { createContext } from 'react'
import { useState } from 'react';

import AnotherPass from './AnotherPass';
export let userContext=createContext()
const Productedetails = () => {
    const [product,setproduct]=useState(
        {pname:"iphone",
            pid:"101",
            price:"50000"}
    );
    // console.log(product)
    
    console.log(userContext)
  return (
    <userContext.Provider value={product}>
    <div className='prodeuctdetails'>
      <AnotherPass/>
       
    </div>
    </userContext.Provider>
  )
};

export default Productedetails;