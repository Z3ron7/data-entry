import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../pages/images/rudhil_logo.png';
import BG from '../pages/images/bg.jpg';

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
          navigate("/customer-entry");
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
      <div style={{ backgroundImage: `url(${BG})`, backgroundSize: "100% 100%", backgroundPosition: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
        <div>
          <img className="ms-2 mx-3" alt='Rudhil logo' src={Logo} style={{ width: "240px", height: "230px" }} />
        </div>
        <form className="mx-auto px-3 shadow" style={{ backgroundColor: "#d3d3d3", marginTop: "30px", width: '55vh' }} onSubmit={onHandleLogin}>
          <div className="mb-2 ">
            <div className="login-top text-center">
              <label className="form-label" style={{ fontSize: "40px", fontWeight:'bold' }}>
                Login 
              </label>
            </div>
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
            <div className="input" style={{ position: "relative" }}>
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
                className="btn btn-transparent"
                style={{ position: "absolute", right: "0px", top: "50%", transform: "translateY(-50%)" }}
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
      </div>
    </>
  );
}

export default Login;