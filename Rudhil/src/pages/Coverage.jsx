import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './coverage.css'

const Coverage = () => {
  const [customerEntryData, setCustomerEntryData] = useState([]);
  const [customerInsuredData, setCustomerInsuredData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  const fetchData = async (apiEndpoint, setData) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${apiEndpoint}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async function (id, apiEndpoint, setData) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        const { data } = await axios.delete(`http://localhost:3000/api/${apiEndpoint}/delete/${id}`);
        console.log(data);
        fetchData(apiEndpoint, setData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleButton1Click = () => {
    if (activeSection === 'insurance') {
      setActiveSection(null);
    } else {
      setActiveSection('insurance');
      fetchData('customer_entry', setCustomerEntryData);
    }
  };

  const handleButton2Click = () => {
    if (activeSection === 'insured') {
      setActiveSection(null);
    } else {
      setActiveSection('insured');
      fetchData('customer_insured', setCustomerInsuredData);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (activeSection === 'insurance') {
      searchRecords('customer_entry', search);
    } else if (activeSection === 'insured') {
      searchRecords('customer_insured', search);
    } else {
      searchRecords('customer_entry', search); // Default to searching in the "customer_entry" table
    }
  };
  
  const searchRecords = async (apiEndpoint, name) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${apiEndpoint}/search/${name}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
useEffect(() => {
  setActiveSection('insurance');
  fetchData('customer_entry', setCustomerEntryData);
}, []);

  const displayData =
    searchResults.length > 0 ? searchResults :
    activeSection === 'insurance' ? customerEntryData :
    activeSection === 'insured' ? customerInsuredData :
    [];

  return (
    <div className="fluid" style={{backgroundColor: "rgb(228, 228, 215)"}}>
      <div className="coverage-container">
    <div className="position-relevant container-sm">
      <div className="col-md-12 d-flex justify-content-end coverage-top" >
        <button
          className={`btn btn-outline-success mx-2 m-5 ${activeSection === 'insurance' ? 'active' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseInsurance"
          aria-expanded={activeSection === 'insurance' ? 'true' : 'false'}
          aria-controls="collapseExample"
          onClick={handleButton1Click}
        >
          Insurance
        </button>
        <button
          className={`btn btn-outline-success mx-2 m-5  ${activeSection === 'insured' ? 'active' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseInsured"
          aria-expanded={activeSection === 'insured' ? 'true' : 'false'}
          aria-controls="collapseExample"
          onClick={handleButton2Click}
        >
          Insured
        </button>
        <div className='containers' style={{marginLeft: '400px'}}>
        <form className="d-flex justify-content-end" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input
              className="form-control "
              type="search"
              placeholder="Search name..."
              aria-label="Search"
              value={search}
              onChange={handleSearchChange}
              style={{width: "40vh"}}
            />
            <button className="mx-2 btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </form>
        </div>
      </div>
      <div className={`coverage collapse ${activeSection === 'insurance' ? 'show' : ''}`} id="collapseInsurance" >
        <h3>Insurance </h3>
        <table className="table table-light table-striped table-bordered border-secondary">
          <thead className="table-dark">
            <tr>
              <th scope="row">Customer_Id</th>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.id}</th>
                <td className="text-wrap">{row.Name}</td>
                <td className='text-center'>
                  <button
                    type="button"
                    className="btn btn-warning m-2"
                    style={{ width: '40px', height: '2rem', alignItems: 'center', justifySelf: 'center' }}
                  >
                    <Link to={`/prodUpdate/${row.id}`} className="text-decoration-none text-white justify-content-center">
                        <i className='text-dark fa fa-edit'></i>
                    </Link>
                   
                  </button>
                  |
                  <button
                    type="button"
                    onClick={() => handleDelete(row.id, 'customer_entry', setCustomerEntryData)}
                    className="btn btn-danger m-2"
                    style={{ width: '40px', height: '2rem', alignItems: 'center' }}
                  >
                    <i className='fa fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`coverage collapse ${activeSection === 'insured' ? 'show' : ''}`} id="collapseInsured" >
        <h3>Insured Customer</h3>
        <table className="table table-light table-striped table-bordered border-secondary">
          <thead className="table-dark">
            <tr>
              <th scope="row">Customer_Id</th>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.id}</th>
                <td className="text-wrap">{row.Name}</td>
                <td className='text-center'>
                  <button
                    type="button"
                    className="btn btn-warning m-2"
                    style={{ width: '40px', height: '2rem', alignItems: 'center', justifySelf: 'center' }}
                  >
                    <Link to={`/prodUpdate/${row.id}`} className="text-decoration-none text-white justify-content-center">
                    <i className='text-dark fa fa-edit m-0' data-bs-toggle="tooltip" data-bs-placement="left"></i>
                    </Link>
                  </button>
                  |
                  <button
                    type="button"
                    onClick={() => handleDelete(row.id, 'customer_insured', setCustomerInsuredData)}
                    className="btn btn-danger m-2"
                    style={{ width: '40px', height: '2rem', alignItems: 'center' }}
                  >
                    <i className='fa fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Coverage;
