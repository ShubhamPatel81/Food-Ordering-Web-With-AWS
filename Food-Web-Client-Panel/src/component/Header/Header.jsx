import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="p-4 mb-4 bg-light rounded-3 mt-1">
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold ">Order Your Food Here </h1>
          <p className="col-md-8 fs-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            ratione repellendus, in nemo nisi libero doloremque 
          </p>
          <Link to="/explore" className="btn btn-primary btn-lg">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
