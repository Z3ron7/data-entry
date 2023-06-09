import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
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
    <div className="container d-grid gap-2 d-md-flex justify-content-md-end">
      {auth ? (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <h3>{name}</h3>
          <button className="btn btn-danger me-2" onClick={handleLogout}>
            Logout <i className="fa fa-sign-out ml-2"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Logout;
