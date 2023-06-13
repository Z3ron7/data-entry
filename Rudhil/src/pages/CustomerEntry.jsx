import React, { useState, useEffect, useCallback } from "react";
import ProdList from "./ProdList";
import "./customer-entry.css";
import axios from "axios";

const CustomerEntry = () => {
  const [Name, setName] = useState("");
  const [customers, setCustomers] = useState([]);

  const updateTable = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer_entry");
      setCustomers(response.data);
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
      await axios.post("http://localhost:3000/api/customer_entry/add", { Name });
      updateTable(); // Call the updateTable function to update the table
      setName(""); // Clear the input field after adding a customer
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fluid bckgrnd" style={{ backgroundColor: "rgb(228, 228, 215)"}}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="bg-white text-black my-2 entry-container">
            <div className="p-1 d-flex flex-column align-items-right">
              <h5 className="fw-bold mb-4 text-uppercase">Customer</h5>
              <form onSubmit={sendCustomer} className="entry-form">
                <div className="mb-4 input-group-sm">
                  <input
                    className="lg form-control"
                    id="name"
                    placeholder="Lastname, Firstname, Middlename"
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button className="btna text-light" type="submit" style={{width:"90px"}}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-2">
            <div className="col-md-12 d-flex justify-content-end">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" 
            aria-expanded="false">Dropdown</button>
              {/* Search box */}
              <input
              className="form-control "
              type="search"
              placeholder="Search name..."
              aria-label="Search"
              style={{width: "30%"}}
            />
            <button className="mx-2 btn btn-outline-success" type="submit">
              Search
            </button>
            </div>
          </div>
      <ProdList customers={customers} updateTable={updateTable} />
    </div>
  );
};

export default CustomerEntry;
