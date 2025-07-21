import React, { useState } from "react";
import FoodDisplay from "../../component/FoodDisplay/FoodDisplay";

function ExploreFood() {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <select
                  className="form-select mt-2"
                  style={{ maxWidth: "140" }}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="momo">Momo</option>
                  <option value="burger">Burger</option>
                  <option value="dessert">Desert</option>
                  <option value="pizza">Pizza</option>
                  <option value="samosa">Samosa</option>
                  <option value="icecream">Ice Cream</option>
                </select>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Search Food..."
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <button className="btn btn-primary mt-2" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchText={searchText} />
    </>
  );
}

export default ExploreFood;
