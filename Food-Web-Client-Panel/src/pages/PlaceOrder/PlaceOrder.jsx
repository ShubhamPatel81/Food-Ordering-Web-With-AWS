import React from "react";
import "./PlaceOrder.css";
import assets from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities } = useContext(StoreContext);

  //cart items
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  //calculatios
  const Subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const Shipping = Subtotal == 0 ? 0.0 : 10;
  const tax = Subtotal * 0.1; //10% tax
  const total = Subtotal + Shipping + tax;

  //totoal product
  const totalItems = cartItems.reduce(
    (acc, food) => acc + quantities[food.id],
    0
  );

  return (
    <div className="container" style={{ background: "#f6f6f6ff" }}>
      <div className=" text-center">
        <img
          className="d-block mx-auto  "
          src={assets.logo}
          alt=""
          width="220"
          height="70"
        />
      </div>

      <div className="row">
        {/* Cart Summary */}
        <div className="col-md-4 order-md-2 mb-4 mt-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span
              className="badge badge-primary badge-pill"
              style={{ color: "blue" }}
            >
              {cartItems.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">
                    Qty: {quantities[item.id]}
                  </small>
                </div>
                <span className="text-muted">
                  &#8377;{item.price * quantities[item.id]}
                </span>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between ">
              <div>
                <small className="text-muted">
                  <span>Shipping:</span>{" "}
                </small>
              </div>
              <span className="text-muted">
                &#8377;{Subtotal === 0 ? 0.0 : Shipping.toFixed(2)}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <small className="text-muted">
                  <span>Tax(10%): </span>
                </small>
              </div>
              <span className="text-muted">&#8377;{tax.toFixed(2)}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377;{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        {/* Billing Address Form */}
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="09090909"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-5 mt-2">
                <label htmlFor="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
              </div>
              <div className="col-md-4 mt-2">
                <label htmlFor="state">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value="">Choose...</option>
                  <option>Karnataka</option>
                </select>
              </div>
              <div className="col-md-3 ">
                <label htmlFor="zip">Zip</label>
                <input
                  type="number"
                  className="form-control no-arrows"
                  placeholder="123456"
                  id="zip"
                  required
                />
              </div>
            </div>

            <hr className="mb-3" />
            <button
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              disabled={cartItems.length === 0}
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrder;
