import axios from "axios";
import { createContext, use, useEffect, useState } from "react";
import { fetchFoodList } from "../service/FoodService";
import { addToCart, getAllCartData, removeQtyFromCart } from "../service/cartService";

export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQuantity = async (foodID) => {
    setQuantities((prev) => ({ ...prev, [foodID]: (prev[foodID] || 0) + 1 }));
    await addToCart(foodID, token);
  };

  const decreaseQuantity = async (foodID) => {
    setQuantities((prev) => ({
      ...prev,
      [foodID]: prev[foodID] > 0 ? prev[foodID] - 1 : 0,
    }));
    await removeQtyFromCart(foodID, token);
  };

  //item remoce form the cart
  const removeFromCart = (foodId) => {
    setQuantities((preQuantiy) => {
      const updatedQuantity = { ...preQuantiy };
      delete updatedQuantity[foodId];
      return updatedQuantity;
    });
  };

  const loadCartData = async (token) => {
    const response = await getAllCartData(token)

    setQuantities(response.data.items);
  };

  const contextValue = {
    foodList,
    increaseQuantity,
    decreaseQuantity,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
