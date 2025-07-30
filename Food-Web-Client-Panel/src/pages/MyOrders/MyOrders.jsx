import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function MyOrders() {
  // @ts-ignore
  const { token } = useContext(StoreContext);
  /** @type {Array} */
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
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 cart">
          <table className="table table-responsive">
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={
                        order.orderedItems?.[0]?.image || "/default-image.png"
                      }
                      alt=""
                      height={45}
                      width={45}
                    />
                  </td>
                  <td>
                    {Array.isArray(order.orderedItems)
                      ? order.orderedItems.map((item, idx) => (
                          <span key={idx}>
                            {item.name} * {item.quantity}
                            {idx < order.orderedItems.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "No items"}
                  </td>
                  <td>₹{order.amount}</td>
                  <td>
                    Items:{" "}
                    {Array.isArray(order.orderedItems)
                      ? order.orderedItems.length
                      : 0}
                  </td>
                  <td className="fw-bold text-capitalize">
                    ● {order.orderStatus}
                  </td>
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
