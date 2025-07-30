import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { registerUser } from "../../service/AuthServiece";
function Register() {
  const [data, setDate] = useState({
    name: "",
    email: "",
    password: "",
  });
 const navigate=  useNavigate()

  const onChnageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
    const response =  await registerUser(data);
      if (response.status == 201) {
        toast.success("Registeration Completed Successfully! Please Login");
        navigate("/login")
      } else {
        toast.error("'Unable to register please try again !!!");
      }
    } catch (error) {
      toast.error("Regisntered Failed!! Try again");
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign Up
                </h5>
                <form onSubmit={onSubmitHandler}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingName "
                      placeholder="Enter Name"
                      name="name"
                      onChange={onChnageHandler}
                      value={data.name}
                      required
                    />
                    <label htmlFor="floatingInput">Full Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      onChange={onChnageHandler}
                      value={data.email}
                      required
                      
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      onChange={onChnageHandler}
                      value={data.password}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-danger btn-login text-uppercase fw-bold mt-2"
                      type="submit"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="mt-4">
                    Already hava an account ? <Link to={"/login"}>Sign In</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
