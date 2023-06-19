import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

function ProdUpdate() {
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleData = async function () {
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

  const handleSubmit = async function (e) {
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
    <div className="fluid bckgrnd min-vh-100" style={{ backgroundColor: "rgb(228, 228, 215)" }}>
      <div className="d-flex justify-content-center">
        <div className="row w-75">
          <div className="col-2"></div>
          <div className="col">
            <div className="col-12">
              <div className="bg-white mt-5" style={{ borderRadius: '10px' }}>
                <div className='py-3 justify-content-center align-items-center h-100'>
                  <form className="container text-black" onSubmit={handleSubmit}>
                    <div className="mb-2 input-group-sm w-100">
                      <label className="form-label text-black">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                  <button className="btna lg mx-2 px-2 text-light mb-2 btn" style={{ width: "90px" }} type="submit">
                    Update
                  </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdUpdate;