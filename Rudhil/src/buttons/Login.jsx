import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onHandleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Login Successful") {
          localStorage.setItem("token", res.data.token); // Store the token in local storage
          navigate("/customerEntry");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("An error occurred during login.");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

      <form className="mx-auto w-25 mt-5 my-5 border px-3 border-dark border-2 " style={{backgroundColor: "rgb(228, 228, 215)"}} onSubmit={onHandleLogin}>
        <div className="mb-2 ">
          <label htmlFor="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            id="exampleInputUsername"
            placeholder="username"
            aria-describedby="usernameHelp"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="password"
              id="exampleInputPassword1"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <i className='fa fa-eye-slash'></i> : <i className='fa fa-eye'></i>}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-50 mx-auto mx-2 d-flex justify-content-center mb-3"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
