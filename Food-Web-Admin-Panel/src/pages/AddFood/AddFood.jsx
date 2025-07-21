import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { addFood } from "../../services/FoodService";
import { toast } from "react-toastify";

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [data, setFormData] = useState({
    name: "",
    category: "pizza",
    price: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    // console.log(data);
  });
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please Upload the image ");
      return;
    }
    try {
      await addFood(data, image);
      toast.success("Food added successfully!");
      setFormData({
        name: "",
        category: "pizza",
        price: "",
        description: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting add Food form. Please try again.");
      return;
    }
  };
  return (
    <div className="ms-3 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-2">Add Food</h2>
            <form onSubmit={onSubmitHandler}>
              {/* Name */}
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  placeholder="Enter food name"
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                />
              </div>

              {/* Category */}
              <div className="mb-2">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  value={data.category}
                  onChange={onChangeHandler}
                >
                  <option value="">Select category</option>
                  <option value="pizza">Pizza</option>
                  <option value="burger">Burger</option>
                  <option value="momo">Momo</option>
                  <option value="salad">Salad</option>
                  <option value="desert">Dessert</option>
                  <option value="icecream">Ice Cream</option>
                  <option value="samosa">Samosa</option>
                </select>
              </div>

              {/* Price */}
              <div className="mb-2">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  placeholder="Enter food price"
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                />
              </div>

              {/* Description */}
              <div className="mb-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  placeholder="Enter food description"
                  className="form-control"
                  id="description"
                  rows={5}
                  name="description"
                  required
                  value={data.description}
                  onChange={onChangeHandler}
                ></textarea>
              </div>

              {/* Upload Image */}
              <div className="mb-2 d-flex align-items-start gap-3">
                {/* Upload icon or image preview */}
                <label
                  htmlFor="image"
                  className="form-label"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="Upload Preview"
                    width={image ? "100%" : 70}
                    style={{
                      maxHeight: "150px",
                      objectFit: "contain",
                      border: image ? "1px solid #ccc" : "none",
                      borderRadius: "4px",
                    }}
                  />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
