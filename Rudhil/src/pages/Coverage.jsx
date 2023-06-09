import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './coverage.css';

const Coverage = () => {
  const [customerEntryData, setCustomerEntryData] = useState([]);
  const [customerInsuredData, setCustomerInsuredData] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (activeSection === 'insurance') {
      searchRecords('customer_entry', searchQuery);
    } else if (activeSection === 'insured') {
      searchRecords('customer_insured', searchQuery);
    } else {
      searchRecords('customer_entry', searchQuery); // Default to searching in the "customer_entry" table
    }
  };

  const searchRecords = async (apiEndpoint, query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${apiEndpoint}/search/${query}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0 || searchQuery.length > 2) {
      searchRecords(activeSection === 'insured' ? 'customer_insured' : 'customer_entry', searchQuery);
    }
  }, [searchQuery, activeSection]);

  useEffect(() => {
    setActiveSection('insurance'); // Set the initial active section to 'insurance'
    fetchData('customer_entry', setCustomerEntryData); // Fetch data for the 'Insurance' section
  }, []);

  const displayData =
        activeSection === 'insurance'
      ? customerEntryData
      : activeSection === 'insured'
      ? customerInsuredData
      : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayData
    .filter((item) => item.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: 'rgb(228, 228, 215)', marginTop: '30px' }}>
        <div className="container-fluid min-vh-100">
          <div className="col-md-12 coverage-top">
        <div className='row'>
          <div className='col-md-5' style={{marginLeft: '30px'}}></div>
        <div className='col'>
            <button
              className={`btn btn-outline-success mx-2 m-5 shadow ${activeSection === 'insurance' ? 'active' : ''}`}
              style={{width:'20vh'}}
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
              className={`btn btn-outline-success mx-2 m-5 shadow ${activeSection === 'insured' ? 'active' : ''}`}
              style={{width:'20vh'}}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseInsured"
              aria-expanded={activeSection === 'insured' ? 'true' : 'false'}
              aria-controls="collapseExample"
              onClick={handleButton2Click}
            >
              Insured
            </button>
            <div className="containers" style={{ marginLeft: '150px' }}>
            <div className='row'>
          <div className='col-2'></div>
        <div className='col'>
              <form className="d-flex justify-content-end mb-5" onSubmit={handleSearchSubmit}>
                <div className="input-group ">
                  <input
                    className="form-control shadow"
                    type="search"
                    placeholder="Search name..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{width:'360px', maxWidth: '100vh' }}
                  />
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          <div className={`collapse container-fluid ${activeSection === 'insurance' ? 'show' : ''}`} id="collapseInsurance" >
          <h3 className='col-4 col-md-12 justify-content-center d-flex' style={{marginLeft:'10vh'}}>Insurance</h3>
          <div className="coverage min-vh-100" >
          <div className='row'>
          <div className='col-2'></div>
        <div className='col'>
            <table className="table table-light table-striped table-bordered border-secondary">
              <thead className="table-dark">
                <tr>
                  <th scope="row">Customer_Id</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{row.id}</th>
                    <td className="text-wrap">{row.Name}</td>
                    <td className="text-center">
                    <Link
                          to={`/prodUpdate/${row.id}`}
                          className="text-decoration-none text-white justify-content-center"
                        >
                      <button
                        type="button"
                        className="btn btn-warning m-2"
                        style={{
                          width: '40px',
                          height: '2rem',
                          alignItems: 'center',
                          justifySelf: 'center',
                        }}
                      >
                          <i className="text-dark fa fa-edit"></i>
                      </button>
                      </Link>
                      |
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id, 'customer_entry', setCustomerEntryData)}
                        className="btn btn-danger m-2"
                        style={{ width: '40px', height: '2rem', alignItems: 'center' }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {displayData.length > itemsPerPage && (
              <div className="pagination justify-content-center mb-4">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
        </div>
        <div className={`collapse container-fluid ${activeSection === 'insured' ? 'show' : ''}`} id="collapseInsured" >
        <h3 className='col-4 col-md-12 justify-content-center d-flex' style={{marginLeft:'10vh'}}>Insured customer</h3>
          <div className="coverage min-vh-100 ">
          <div className='row'>
          <div className='col-2'></div>
        <div className='col'>
                <table className="table table-light table-striped table-bordered border-secondary">
              <thead className="table-dark">
                <tr>
                  <th scope="row">Customer_Id</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{row.id}</th>
                    <td className="text-wrap">{row.Name}</td>
                    <td className="text-center">
                    <Link
                          to={`/InsuredUpdate/${row.id}`}
                          className="text-decoration-none text-white justify-content-center"
                        >
                      <button
                        type="button"
                        className="btn btn-warning m-2"
                        style={{
                          width: '40px',
                          height: '2rem',
                          alignItems: 'center',
                          justifySelf: 'center',
                        }}
                      >
                          <i className="text-dark fa fa-edit"></i>
                      </button>
                      </Link>
                      |
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id, 'customer_insured', setCustomerInsuredData)}
                        className="btn btn-danger m-2"
                        style={{ width: '40px', height: '2rem', alignItems: 'center' }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {displayData.length > itemsPerPage && (
              <div className="pagination justify-content-center mb-4">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
  );
};

export default Coverage;