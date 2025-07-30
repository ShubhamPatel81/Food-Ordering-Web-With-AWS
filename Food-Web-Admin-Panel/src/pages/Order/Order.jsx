import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Order.css";

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/orders/all");
    setData(response.data);
  };

  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(
      `http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`
    );
    if (response.status === 200) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold text-primary">All Orders</h2>

      {data.length === 0 ? (
        <p className="text-center text-muted">No orders available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={index} className="bg-light">
                  <td>
                    <img
                      src={assets.delivery}
                      alt="Product"
                      height={45}
                      width={45}
                      className="rounded-circle border"
                    />
                  </td>

                  <td style={{ maxWidth: "250px" }}>
                    {Array.isArray(order.orderItemList) &&
                    order.orderItemList.length > 0 ? (
                      order.orderItemList.map((item, idx) => (
                        <span
                          key={idx}
                          className="badge bg-secondary me-1 mb-1"
                        >
                          {item.name} × {item.quantity}
                        </span>
                      ))
                    ) : (
                      <span className="text-danger">No items</span>
                    )}
                  </td>

                  <td className="fw-semibold text-success">
                    ₹{order.amount?.toFixed(2)}
                  </td>

                  <td>{order.userAddress}</td>
                  <td>{order.email}</td>
                  <td>{order.phoneNumber}</td>

                  <td>
                    <select
                      className="form-select"
                      onChange={(event) => updateStatus(event, order.id)}
                      value={order.orderStatus}
                    >
                      <option value="Food Preparing">Food Preparing</option>
                      <option value="Out For Delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
