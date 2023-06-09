import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TransactionTable from "./TransactionTable";
import Select from "react-select";

const Transaction = () => {
  const [policy, setPolicy] = useState("");
  const [transac_date, setTransac_date] = useState(null);
  const [due_date, setDue_date] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [coverage, setCoverage] = useState([]);
  const [name, setName] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [optionList1, setOptionList1] = useState([]);
  const [optionList2, setOptionList2] = useState([]);

  const updateTable = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/transaction");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchInsuranceData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer_entry");
      setOptionList1(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchInsuranceData1 = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer_insured");
      setOptionList2(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    updateTable();
    fetchInsuranceData();
    fetchInsuranceData1();
  }, [updateTable, fetchInsuranceData, fetchInsuranceData1]);

  const sendCustomer = async (event) => {
    event.preventDefault();
    try {
      const addResponse = await axios.post("http://localhost:3000/api/transaction/add", {
        policy,
        transac_date,
        due_date,
        name: name.map((option) => option.label),
      });

      const { id } = addResponse.data; // Get the ID from the response
      setSelectedId(id); // Store the ID in the state

      await axios.post("http://localhost:3000/api/transaction/add/list", {
        list: coverage.map((option) => option.label),
        id, // Pass the ID of the previously inserted record
      });

      updateTable();
      setPolicy("");
      setTransac_date(null);
      setDue_date(null);
      setCoverage([]);
      setName([]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendCustomern = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/transaction/add/list", {
        list: coverage.map((option) => option.label),
        id: selectedId, // Pass the ID of the previously inserted record
      });

      updateTable();
      setCoverage([]);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const handleTransac_dateChange = (date) => {
    setTransac_date(date);
  };

  const handleDue_dateChange = (date) => {
    setDue_date(date);
  };

  const optionList = [
    { value: "1", label: "Life" },
    { value: "2", label: "Health" },
    { value: "3", label: "Accident" },
    { value: "4", label: "Investment" },
    { value: "5", label: "Accident" }
  ];

  const handleSelect = (data) => {
    setCoverage(data);
  };
  const handleSelect1 = (data) => {
    setName(data);
  };

  return (
    <div className="container-fluid mt-3 px-3 py-2" style={{ backgroundColor: "rgb(228, 228, 215)" }}>
      <div className="row">
        <div className="col-sm-3 "></div>
        <div className="col-md-8">
          <div className="row border">
            <div className="col-8 col-sm-6 border border-dark border-2" >
              <form onSubmit={sendCustomer} style={{ borderRadius: "1rem" }}>
                <div className="mb-2 input-group-sm w-100 mt-2">
                  <input
                    className="lg form-control"
                    id="name"
                    placeholder="Policy #"
                    type="text"
                    value={policy}
                    onChange={(e) => setPolicy(e.target.value)}
                  />
                </div>
                <div className="dropdown-container w-100 py-2" >
                  <Select
                    options={optionList1}
                    placeholder="Insurance"
                    isSearchable={true}
                    isClearable={true}
                    value={name}
                    onChange={handleSelect1}
                  />
                </div>
                <div className="dropdown-container w-100 py-2" >
                  <Select
                    options={optionList2}
                    placeholder="Insured"
                    isSearchable={true}
                    isClearable={true}
                    value={name}
                    onChange={handleSelect1}
                  />
                </div>
                <div className="form-control mb-2">
                  <DatePicker
                    className="form-control btn btn-light"
                    selected={transac_date}
                    placeholderText="Transaction date"
                    id="transactionDate"
                    onChange={handleTransac_dateChange}
                    value={transac_date}
                  />
                </div>
                <div className="form-control">
                  <DatePicker
                    className="form-control btn btn-light"
                    selected={due_date}
                    placeholderText="Due date"
                    id="dueDate"
                    onChange={handleDue_dateChange}
                    value={due_date}
                  />
                </div>
                <button className="btna lg mx-2 px-2 text-light" style={{ width: "90px" }} type="submit">
                  Save
                </button>
              </form>
              Level 2: .col-8 .col-sm-5
            </div>
            <div className="col-4 col-sm-6 border border-dark border-2 d-flex flex-column">
              <form onSubmit={sendCustomern} style={{ borderRadius: "1rem", maxWidth: "800px" }} className="flex-grow-1">
                <div className="dropdown-container w-100 py-2" >
                  <Select
                    options={optionList}
                    placeholder="Select name"
                    isSearchable={true}
                    isMulti
                    value={coverage}
                    onChange={handleSelect}
                  />
                </div>
                <button className="btna lg mx-2 px-2 text-light" style={{ width: "90px" }} type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <TransactionTable
        customers={customers.map((customer) => ({
          ...customer,
          transac_date: formatDate(new Date(customer.transac_date)),
          due_date: formatDate(new Date(customer.due_date)),
        }))}
        updateTable={updateTable}
      />
    </div>
  );
};

export default Transaction;
