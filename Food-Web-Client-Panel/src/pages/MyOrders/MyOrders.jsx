import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function MyOrders() {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data); // See what's coming from DB
    setData(response.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 cart">
          <h3 className="mb-4">My Orders</h3>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Image</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={
                        order.orderItemList?.[0]?.image || "/default-image.png"
                      }
                      alt="Product"
                      height={45}
                      width={45}
                    />
                  </td>
                  <td>
                    {Array.isArray(order.orderItemList) &&
                    order.orderItemList.length > 0
                      ? order.orderItemList.map((item, idx) => (
                          <span key={idx}>
                            {item.name
                              ? `${item.name} x ${item.quantity}`
                              : "Unnamed item"}
                            {idx < order.orderItemList.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "No items"}
                  </td>

                  <td>₹{order.amount}</td>
                  <td className="text-capitalize fw-bold">
                    ● {order.orderStatus}
                  </td>
                  <td>{order.userAddress}</td>
                  <td>{order.email}</td>
                  <td>{order.phoneNumber}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={fetchOrders}
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
