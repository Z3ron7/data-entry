import React, { useState, useEffect, useCallback } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
  const [name1, setName1] = useState(null);
  const [name2, setName2] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [optionList1, setOptionList1] = useState([]);
  const [optionList2, setOptionList2] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

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
      const options = response.data.map((item) => ({
        value: item.id,
        label: item.Name,
      }));
      setOptionList1(options);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchInsuranceData1 = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer_insured");
      const options = response.data.map((item) => ({
        value: item.id,
        label: item.Name,
      }));
      setOptionList2(options);
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
      // Check if policy number, name, transac_date, or due_date is null
      if (!policy) {
        alert("Input a policy number!");
        return;
      }

      if (!name1 && !name2) {
        alert("Select a name!");
        return;
      }
  
      if (!transac_date) {
        alert("Select a transaction date!");
        return;
      }
  
      if (!due_date) {
        alert("Select a due date!");
        return;
      }
  
      const addResponse = await axios.post("http://localhost:3000/api/transaction/add", {
        policy,
        transac_date,
        due_date,
        name: (name1 && name1.label) || (name2 && name2.label),
      });
  
      if (addResponse.data.success) {
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
        setName1(null);
        setName2(null);
      } else {
        // Policy already exists or fields were not filled, display an alert message to the user
        alert(addResponse.data.message);
      }
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
    { value: "5", label: "Fire Insurance" },
  ];

  const handleSelect0 = (data) => {
    setCoverage(data);
  };

  const handleSelect1 = (selectedOption) => {
    setName1(selectedOption);
  };

  const handleSelect2 = (selectedOption) => {
    setName2(selectedOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/transaction/search/${searchQuery}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (searchQuery.length === 0 || searchQuery.length > 2) {
      fetchData();
    }
  }, [searchQuery]);

  const handleClear = () => {
    setPolicy("");
    setTransac_date(null);
    setDue_date(null);
    setCoverage([]);
    setName1(null);
    setName2(null);
  };

  return (
    <div className="fluid py-3" style={{ backgroundColor: "rgb(228, 228, 215)"}}>
      <div className="d-flex justify-content-center">
      <div className="row w-100">
        <div className="col-3"></div>
        <div className="col-8">
          <div className="row border mb-4">
            <div className="col-6 col-sm-6 border border-dark border-2">
              <form onSubmit={sendCustomer} style={{ borderRadius: "1rem" }}>
                <div className="mb-2 input-group w-100 mt-2">
                  <input
                    className="lg form-control"
                    id="policy"
                    placeholder="Policy number"
                    type="text"
                    value={policy}
                    onChange={(e) => setPolicy(e.target.value)}
                    autoComplete='off'
                  />
                </div>
                <div className="dropdown-container w-100 py-2">
                  <Select
                    options={optionList1}
                    placeholder="Insurance"
                    isSearchable={true}
                    isClearable={true}
                    value={name1}
                    onChange={handleSelect1}
                  />
                </div>
                <div className="dropdown-container w-100 py-2">
                  <Select
                    options={optionList2}
                    placeholder="Insured"
                    isSearchable={true}
                    isClearable={true}
                    value={name2}
                    onChange={handleSelect2}
                  />
                </div>
                <div className="form-control-sm mb-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                  <label className="d-flex py-2" style={{fontSize:'15px', color:'#696969'}}>Transaction date:</label>
                    <DatePicker className=" form-control-sm btn btn-light" 
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={handleTransac_dateChange}
                    value={transac_date} />
                  </DemoContainer>
                </LocalizationProvider>
                </div>
                <div className="form-control-sm">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                  <label className="d-flex py-2" style={{marginRight: "48px", fontSize:'15px', color:'#696969'}}>Due date:</label>
                    <DatePicker className=" form-control-sm btn btn-light"
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={handleDue_dateChange}
                    value={due_date} />
                  </DemoContainer>
                </LocalizationProvider>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btna lg mx-2 px-2 text-light mb-2" style={{ width: "90px" }} type="submit">
                    Save
                  </button>
                  <button className="btns lg mx-2 px-2 text-light mb-2" style={{ width: "90px" }} type="button" onClick={() => handleClear()}>
                    Clear
                  </button>
                </div>
              </form>
            </div>
            <div className="col-4 col-sm-6 border border-dark border-2 d-flex flex-column">
              <form onSubmit={sendCustomern} style={{ borderRadius: "1rem" }} className="flex-grow-1">
                <div className="dropdown-container w-100 py-2">
                  <Select
                    options={optionList}
                    placeholder="Category..."
                    isSearchable={true}
                    isMulti
                    value={coverage}
                    onChange={handleSelect0}
                  />
                </div>
                <button className="btna lg mx-2 mx-auto px-2 text-light" style={{ width: "90px" }} type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="mb-4 mt-2">
            <div className="col-md-12 d-flex justify-content-end">
              {/* Search box */}
              <input
                className="form-control shadow"
                type="search"
                placeholder="Search policy #, name, date or category..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "40%", marginRight: '26px' }}
              />
            </div>
          </div>
          <TransactionTable
  customers={customers.map((customer) => ({
    ...customer,
    transac_date: formatDate(new Date(customer.transac_date)),
    due_date: formatDate(new Date(customer.due_date)),
  }))}
  updateTable={updateTable}
  searchQuery={searchQuery}
/>
    </div>
  );
};

export default Transaction;