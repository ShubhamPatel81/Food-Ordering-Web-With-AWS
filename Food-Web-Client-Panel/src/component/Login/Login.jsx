import React, { useContext, useState } from "react";

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../service/AuthServiece";
import { StoreContext } from "../../context/StoreContext";
const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setDate] = useState({
    email: "",
    password: "",
  });
  const onChnageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(data);

    try {
      const response = await login(data);
      if (response.status == 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await loadCartData(response.data.token);
        navigate("/");
      } else {
        toast.error("Login Failed 1 !!!");
      }
    } catch (error) {
      toast.error("Login Failed 2 !!!");
      console.log("error while login", error);
    }
  };
  return (
    <div>
      <div className="login-container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={onSubmitHandler}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      onChange={onChnageHandler}
                      value={data.email}
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
                    Don't hava an account ?{" "}
                    <Link to={"/register"}>Sign Up</Link>
                  </div>

                  {/* <hr className="my-4" />
                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-google btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      <i className="fab fa-google me-2"></i> Sign in with Google
                    </button>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-facebook btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      <i className="fab fa-facebook-f me-2"></i> Sign in with
                      Facebook
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
