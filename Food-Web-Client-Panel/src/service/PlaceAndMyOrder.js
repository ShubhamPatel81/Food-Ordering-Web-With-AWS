import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
const URL = 'http://localhost:8080/api/orders';

export const createOrder = async () => {

  try {
    const response = await axios.post(URL + "/create");
    return response
  } catch (err) {
    throw err;
  }

}