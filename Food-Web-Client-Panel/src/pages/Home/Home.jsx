import React, { useState } from "react";
import Header from "../../component/Header/Header";
import ExplreMenu from "../../component/ExploreMenu/ExplreMenu";
import FoodDisplay from "../../component/FoodDisplay/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <main className="container">
      {" "}
      <Header />
      <ExplreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchText={""} />
    </main>
  );
};

export default Home;
