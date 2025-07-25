import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ name, description, id, imageUrl, price }) {
  const { increaseQuantity, decreaseQuantity, quantities } =
    useContext(StoreContext);

  return (
    <div className=" col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex flex-column align-items-center">
      <div className="card" style={{ maxWidth: "320px" }}>
        <Link to={`/food/${id}`}>
          <img
            src={imageUrl}
            height={260}
            width={260}
            className="card-img-top"
            alt="Product Image"
          />
        </Link>

        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">Rs.{price}</span>
            <div>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light">
          <Link to={`/food/${id}`} className="btn btn-outline-primary btn-sm">
            {" "}
            Food Details
          </Link>

          {quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => decreaseQuantity(id)}
              >
                <i className="bi bi-dash-circle"></i>
              </button>
              <span className="fw-bold">{quantities[id]}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => increaseQuantity(id)}
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => increaseQuantity(id)}
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
