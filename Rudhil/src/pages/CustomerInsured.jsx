import React, { useState, useEffect, useCallback } from "react";
import "./customer.css";
import axios from "axios";
import InsuredList from "./InsuredList";

const CustomerInsured = () => {
  const [Name, setName] = useState("");
  const [customerinsured, setCustomerInsured] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const updateTable = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer_insured");
      setCustomerInsured(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    updateTable();
  }, [updateTable]);

  const sendCustomer = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/customer_insured/add", { Name });
      updateTable(); // Call the updateTable function to update the table
      setName(""); // Clear the input field after adding a customer
      alert("Customer successfully added!"); // Display the alert message
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customer_insured/search/${searchQuery}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (searchQuery.length === 0 || searchQuery.length > 2) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="fluid bckgrnd" style={{ backgroundColor: "rgb(228, 228, 215)"}}>
      <div className="d-flex justify-content-center">
      <div className='row w-75'>
          <div className='col-2'></div>
        <div className='col'>
        <div className="col-12">
          <div className="bg-white text-black my-2 entry-container">
            <div className="p-1 d-flex flex-column align-items-right">
              <h5 className="fw-bold mb-4 text-uppercase">Insured Customer</h5>
              <form onSubmit={sendCustomer} className="entry-form">
                <div className="mb-4 input-group-sm">
                  <input
                    className="lg form-control"
                    id="name"
                    placeholder="Lastname, Firstname, Middlename"
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button className="btna btn text-light" type="submit" style={{width:"90px"}}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
          </div>
          </div>
          <div className="mb-4 mt-2">
            <div className="col-12 d-flex justify-content-end">
              {/* Search box */}
              <input
              className="form-control shadow"
              type="search"
              placeholder="Search name..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{width: "30%", marginRight: '26px'}}
            />
            </div>
          </div>
      <InsuredList customers={customerinsured} updateTable={updateTable} searchQuery={searchQuery}/>
    </div>
  );
};

export default CustomerInsured;