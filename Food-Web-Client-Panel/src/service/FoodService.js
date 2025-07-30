import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8080/api/foods";

export const fetchFoodList = async () => {
  try {
    const response = await axios.get(API_URL);
    // console.log("Food list fetched successfully:", respinse.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
    toast.error("Error fetching(Client) food list 1: FoodService.js ");
  }
};

export const fetchFoodDetails = async (id) => {
  try {
    const response = await axios.get(API_URL + "/" + id.id);
    if (response.status === 200) {
      console.log("Food details fetched successfully:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching food list:", error);
    toast.error("Error fetching(Client) food list 2: FoodService.js ");
    throw error;
  }
};