import React, { use, useEffect } from "react";
import "./ListFood.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/FoodService";
const ListFood = () => {
  /** @type {[{ imageUrl: string, name: string, category: string, price: number }[], Function]} */
  const [list, setList] = React.useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Error fetching food list:", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food removed successfully");
        fetchList();
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      console.error("Error while removing food:", error);
      toast.error("Failed to remove food");
    }

    // console.log("Removing food with ID:", foodId);

    // const response = await  axios.delete(`http://localhost:8080/api/foods/${foodId}` );

    // await  fetchList();
    // if (response.status === 204) {
    //     toast.success("Food removed successfully");
    //   } else {
    //     toast.error("Failed to remove food");
    //   }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>&#8377;{item.price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFood(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;
