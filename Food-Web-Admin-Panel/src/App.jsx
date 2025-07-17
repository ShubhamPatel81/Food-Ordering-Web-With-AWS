import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Order from "./pages/Order/Order";
import SideBar from "./components/SideBar/SideBar";
import MenuBar from "./components/MenuBr/MenuBar";

const App = () => {
  const [siderbarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!siderbarVisible);
  };

  return (
    <div>
      <div className="d-flex" id="wrapper">
        <SideBar sidebarVisible={siderbarVisible} />

        <div id="page-content-wrapper">
          <MenuBar toggleSidebar={toggleSidebar} />

          <div className="container-fluid">
            <Routes>
              <Route path="/add" element={<AddFood />} />
              <Route path="/list" element={<ListFood />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/" element={<ListFood />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
