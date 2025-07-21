import axios from "axios";
import { createContext, use, useEffect, useState } from "react";
import { fetchFoodList } from "../service/FoodService";

export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);
    }

    loadData();
  }, []);

  const [quantities, setQuantities] = useState({});
  const increaseQuantity = (foodID) => {
    setQuantities((prev) => ({ ...prev, [foodID]: (prev[foodID] || 0) + 1 }));
  };
  const decreaseQuantity = (foodID) => {
    setQuantities((prev) => ({
      ...prev,
      [foodID]: prev[foodID] > 0 ? prev[foodID] - 1 : 0,
    }));
  };

  const contextValue = {
    foodList,
    increaseQuantity,
    decreaseQuantity,
    quantities
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
