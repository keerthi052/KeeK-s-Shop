import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import TodoList from "./Components/TodoList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Productedetails from "./Components/productdetails";
import NewProduct from "./Components/NewProduct";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


const App = () => {
  return (
    <div className="app-container">
       <Header />
        <BrowserRouter>
       
      {/* Navigation */}
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Product Details</Link>
        </li>
        <li>
          <Link to="/todo">Todo List</Link>
        </li>
          <li>
          <Link to="/NewProduct">New Product</Link>
        </li>
      </ol>

 

      {/* Router Setup */}
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Productedetails />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/NewProduct" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
