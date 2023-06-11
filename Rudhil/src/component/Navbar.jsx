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
    <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-custom">
    <i className="navbar-brand bi bi-justify fs-4"></i>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
    aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {auth ? (
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {name}
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" onClick={handleLogout} role='button'>Logout</a></li>
          </ul>
        </li>
      </ul>
      ) : null} 
    </div>
</nav>
  );
};

export default Navbar;