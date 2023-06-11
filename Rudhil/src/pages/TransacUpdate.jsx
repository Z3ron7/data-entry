import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";
import "./transacUpdate.css";

const TransacUpdate = () => {
  const [policy, setPolicy] = useState("");
  const [transac_date, setTransac_date] = useState(null);
  const [due_date, setDue_date] = useState(null);
  const [category, setCategory] = useState([]);
  const [name1, setName1] = useState(null);
  const [name2, setName2] = useState(null);
  const [selectedId] = useState(null);
  const [optionList1, setOptionList1] = useState([]);
  const [optionList2, setOptionList2] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleData = async function () {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/transaction/${id}`);
      setPolicy(data[0].policy);
      setName1(data[0].name1);
      setName2(data[0].name2);
      setTransac_date(new Date(data[0].transac_date));
      setDue_date(new Date(data[0].due_date));
      setCategory(data[0].list.map((value) => ({ value, label: value })));
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
      policy: policy,
      name: (name1 && name1.label) || (name2 && name2.label),
      transac_date: transac_date,
      due_date: due_date,
      list: category.map((option) => option.value), // Extract values from category array
    };
  
    try {
      await axios.put(`http://localhost:3000/api/transaction/update/${id}`, updateDetails);
      await axios.post("http://localhost:3000/api/transaction/add/list", {
        list: category.map((option) => option.value),
        id: selectedId, // Pass the ID of the previously inserted record
      });
  
      window.alert("Customer updated successfully");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.log(error);
    }
  };  

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
    fetchInsuranceData();
    fetchInsuranceData1();
  }, [fetchInsuranceData, fetchInsuranceData1]);

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
    setCategory(data);
  };

  const handleSelect1 = (selectedOption) => {
    setName1(selectedOption);
  };

  const handleSelect2 = (selectedOption) => {
    setName2(selectedOption);
  };

  return (
    <div className="fluid py-3" style={{ backgroundColor: "rgb(228, 228, 215)" }}>
      <div className="row">
        <div className="col-sm-5 "></div>
        <div className="col-md-7">
          <div className="row border">
            <div className="col-8 col-sm-6 border border-dark border-2">
              <form onSubmit={handleSubmit} style={{ borderRadius: "1rem" }}>
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
                <div className="dropdown-container w-100 py-2">
                  <Select
                    options={optionList}
                    placeholder="Select name"
                    isSearchable={true}
                    isMulti
                    value={category}
                    onChange={handleSelect0}
                  />
                </div>
                <button className="btna lg mx-2 px-2 text-light mb-2 mx-auto" style={{ width: "90px" }} type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransacUpdate;
