import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8080/api/foods";

export const fetchFoodList = async () => {
  try {
    const respinse = await axios.get(API_URL);
    // console.log("Food list fetched successfully:", respinse.data);
    return respinse.data;
  } catch (error) {
    toast.error("Error fetching food list:", error);
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
    toast.error("Error fetching food details:", error);
    throw error;
  }
};