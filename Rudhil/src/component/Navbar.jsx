import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../pages/images/rudhil_logo.png';
import './navbar.css';

const Navbar = () => {
  const [auth, setAuth] = useState(null);
  const [name, setName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000', { withCredentials: true })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    axios
      .get('http://localhost:3000/logout', { withCredentials: true })
      .then((res) => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return (
    <nav class="navbar navbar-light bg-white py-0 shadow sticky-top navbar-custom">
  <div class="container-fluid">
  <a class="navbar-brand" href="#">
      <img src={Logo} alt="" width="60" height="50"/>
    </a>

        <div className="container">
      {auth ? (
        <div className="d-flex justify-content-end" >
        <h3>{name}</h3>
        <button className="btn btn-outline-danger" style={{marginLeft: "10px"}} onClick={handleLogout}>
          Logout <i className="fa fa-sign-out "></i>
        </button>
      </div>
      
      ) : null}
    </div>
      </div>
    </nav>
  );
};

export default Navbar;
