import React, { use, useCallback, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoods = foodList.filter(
    (food) =>
      category.toLowerCase() === "all" ||
      (food.category.toLowerCase() === category.toLowerCase() &&
        food.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="container mt-5">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem
              key={index}
              name={food.name}
              description={food.description}
              id={food.id}
              price={food.price}
              imageUrl={food.imageUrl}
            />
          ))
        ) : (
          <div className="col-12 text-center">
            <h1 className="text-secondary">No Food Items Available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
