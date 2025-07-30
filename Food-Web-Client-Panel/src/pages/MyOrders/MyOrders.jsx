import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import assets from "../../assets/assets";

import "./MyOrders.css";
function MyOrders() {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(response.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold text-primary">My Orders</h2>

      {data.length === 0 ? (
        <p className="text-center text-muted">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Items</th>
                <th scope="col">Amount</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Status</th>
                <th scope="col">Refresh</th>
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
                  <td>{order.phoneNumber}</td>
                  <td className="fw-bold text-capitalize">
                    <span className="badge bg-info text-dark">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={fetchOrders}
                      title="Refresh"
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
