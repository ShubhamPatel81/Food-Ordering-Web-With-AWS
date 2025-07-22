import React, { act, useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    foodList,
    increaseQuantity,
    decreaseQuantity,
    quantities,
    removeFromCart,
  } = useContext(StoreContext);

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

  const navigate = useNavigate();
  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <p>Your Cart is Empty</p>
          ) : (
            <div className="card mb-4 ju">
              <div className="card-body">
                {cartItems.map((food) => (
                  <div key={food.id} className="row cart-item mb-2 ">
                    <div className="col-md-3">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="img-fluid rounded"
                        width={100}
                      />
                    </div>
                    <div className="col-md-5 ">
                      <h5 className="card-title ">{food.name}</h5>
                      <p className="text-muted">
                        Category:{" "}
                        <span className="badge text-bg-warning">
                          {food.category}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => decreaseQuantity(food.id)}
                        >
                          -
                        </button>
                        <input
                          style={{ maxWidth: "100px" }}
                          type="text"
                          className="form-control  form-control-sm text-center quantity-input"
                          value={quantities[food.id]}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => increaseQuantity(food.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold">
                        &#8377;{food.price * quantities[food.id].toFixed(2)}
                      </p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(food.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}

                <div className="card mt-4">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <p className="mb-0 me-4">
                      <strong>Total Products:</strong> {totalItems}
                    </p>
                    <p className="fw-bold mb-0">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-start mb-4">
            <Link to={"/"} className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>&#8377;{Subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>&#8377;{Subtotal === 0 ? 0.0 : Shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>&#8377;{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>
                  &#8377;{Subtotal === 0 ? 0.0 : total.toFixed(2)}
                </strong>
              </div>
              <button
                className="btn btn-primary w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
