import React from "react";
import MenuBar from "./menubar/MenuBar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ExploreFood from "./pages/Explore/ExploreFood.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Header from "./component/Header/Header.jsx";
import FoodDetails from "./pages/FoodDetails/FoodDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Login from "./component/Login/Login.jsx";
import Register from "./component/Register/Register.jsx";

import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div>
      <MenuBar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<PlaceOrder />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
