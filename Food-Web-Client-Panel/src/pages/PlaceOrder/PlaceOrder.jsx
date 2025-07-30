import React, { useState } from "react";
import "./PlaceOrder.css";
import assets from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../service/constants.js";
import { useNavigate } from "react-router-dom";
import Razorpay from "razorpay";
const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("Data", data);
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.state} ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: Number(total.toFixed(2)),
      orderStatus: "Preparing",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201 && response.data.razorpayOrderId) {
        // Initiat payment
        initiateRazorpayPayment(response.data);
      } else {
        toast.error("Unable to Place order (PlaceOrder.jsx 1)");
      }
    } catch (error) {
      toast.error("Unable to Place order (PlaceOrder.jsx 2)");
    }
  };

  //initiate payment
  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount * 100, // Convert to paisa
      currency: "INR",
      name: "Food Land", // this is the name of hotel/service from where the payment is coming
      description: "Food order payment",
      order_id: order.razorpayOrderId,
      handler: function (response) {
        console.log("Razorpay response in handler:", response);
        verifyPayment(response); // ✅ has all 3 fields
      },
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: async function () {
          toast.error("Payment cancelled !!! ");
          // await deleteOrder(order.id);
        },
      },
    };
    const razorpay = new window.Razorpay(options); //thus will open the new window
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    };
    console.log("Payment data being sent to backend:", paymentData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/verify",
        paymentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Payment Successfull!!!");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed . Try Again 1 {PlaceOrder.jsx} ");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed . Try Again 2 {PlaceOrder.jsx}");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete("http://localhost:8080/api/orders/" + orderId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order Deleted SuccessFully !! ");
    } catch (error) {
      toast.error("Order Deleted Failed PlaceOrder.jsx");
    }
  };

  const clearCart = async () => {
  // console.log("Attempting to clear cart...");
  try {
    await axios.delete("http://localhost:8080/api/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setQuantities({});
  } catch (error) {
    console.error("Cart clearing error:", error);
    toast.error("Error While Clearing the cart (PlaceOrder.jsx)");
  }
};

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
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
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
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
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
                  name="phoneNumber"
                  onChange={onChangeHandler}
                  value={data.phoneNumber}
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
                name="address"
                onChange={onChangeHandler}
                value={data.address}
              />
            </div>

            <div className="row">
              <div className="col-md-5 mt-2">
                <label htmlFor="country">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                >
                  <option value="">Choose...</option>
                  <option>Karnataka</option>
                </select>
              </div>
              <div className="col-md-4 mt-2">
                <label htmlFor="state">City</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={data.city}
                >
                  <option value="">Choose...</option>
                  <option>Banglore</option>
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
                  name="zip"
                  onChange={onChangeHandler}
                  value={data.zip}
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
