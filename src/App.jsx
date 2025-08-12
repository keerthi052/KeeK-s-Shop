import React from 'react'
import Productdetails from './Components/productdetails'
import Passproduct from './Components/Passproduct';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  return (
    
    <div className="app-container" >
    <Header/>
    <Passproduct/>
    <Footer/>
    </div> 
  )
};

export default App;