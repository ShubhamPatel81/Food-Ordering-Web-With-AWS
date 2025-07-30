import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8080/api/cart";

export const addToCart = async (footId, token) => {
  try {
    await axios.post(
      API_URL,
      { foodId: footId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

  } catch (err) {
    // console.log("Error in add to cart (cartService.js 1)", err);
    toast.error("Adding item to cart is Failed 1")
  }
}
export const removeQtyFromCart = async (footId, token) => {
  try {
    await axios.post(
      API_URL + "/remove",
      { foodId: footId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.log("Error in removing quantity to cart (cartService.js 2", err);
    toast.error("Removing item to cart is Failed 2")
  }
}

export const getAllCartData = async (token) => {
  try {
      const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    console.log("Error in get cart data(cartService.js 3", err);
    toast.error("Failed  to fetch  data 3")
  }
}