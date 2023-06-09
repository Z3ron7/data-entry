import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

function ProdUpdate() {
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleData = async function() {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/customer_entry/${id}`);
      setName(data[0].Name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleSubmit = async function(e) {
    e.preventDefault();

    const updateDetails = {
      Name: Name
    };

    try {
      await axios.put(`http://localhost:3000/api/customer_entry/update/${id}`, updateDetails);
      window.alert("Customer updated successfully");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary" style={{ marginLeft: "450px", marginRight: "160px", backgroundColor: "rgb(228, 228, 215)" }}>
      <div className='product-display justify-content-center align-items-center h-100'>
        <form className="container mt-3 text-light" onSubmit={handleSubmit}>
          <div className="mb-2 input-group-sm w-100">
            <label className="form-label text-light">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className="justify-content-center"
            type="submit"
            style={{
              width: '20%',
              height: '3rem',
              marginTop: '1rem',
              justifyContent: 'center'
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProdUpdate;
