import React from "react";
import MenuBar from "./menubar/MenuBar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ExploreFood from "./pages/Explore/ExploreFood.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Header from "./component/Header/Header.jsx";
import FoodDetails from "./pages/FoodDetails/FoodDetails.jsx";

function App() {
  return (
    <div>
      <MenuBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/food/:id" element={<FoodDetails />} />
      </Routes>
    </div>
  );
}

export default App;
