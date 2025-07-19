import axios from "axios";
import { data } from "react-router-dom";


const API_URL = "http://localhost:8080/api/foods";

// Function to add food to the list of foods
export const addFood = async (foodData, image) => {

  const formData = new FormData();
  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  try {
    await axios.post(
      API_URL,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } catch (error) {
    console.log("Error ", error);
    alert("Error on adding the food !! ");
    throw error;
  }
}

// Function to fetch the list of foods
export const getFoodList = async () => {
  try {
      const response = await axios.get(API_URL);
    
      return response.data;
  } catch (error) { 
      console.log("Food List: ", data);
      throw error;
  }
}


// Function to remove food from the list of foods
export const deleteFood = async (foodId) => {
  try {
    const response = await axios.delete(`${API_URL}/${foodId}`);
    if (response.status === 204) {
      return true; // Food removed successfully
    } else {
      return false; // Failed to remove food
    }
  } catch (error) {
    console.error("Error while removing food:", error);
    throw error;
  }
}

  // const response = await  axios.delete(`http://localhost:8080/api/foods/${foodId}` );

  // await  fetchList();
  // if (response.status === 204) {
  //     toast.success("Food removed successfully");
  //   } else {
  //     toast.error("Failed to remove food");
  //   }