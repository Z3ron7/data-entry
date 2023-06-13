import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './prodlist.css';

const ProdList = ({ customers, updateTable, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = async function (id) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/customer_entry/delete/${id}`);
        updateTable();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.filter((item) =>
  item.Name.toLowerCase().includes(searchQuery.toLowerCase())
).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <section className='content-main'>
        <div className='insurance-table min-vh-100'>
          <table className='table table-light table-striped table-bordered border-secondary'>
            <thead className='table-dark'>
              <tr>
                <th scope='row'>Customer_Id</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <th scope='row'>{item.id}</th>
                  <td className='text-wrap'>{item.Name}</td>
                  <td className='text-center'>
                    <button type='button' className='btn btn-warning m-2' style={{ width: '40px', height: '2rem', alignItems: 'center', justifySelf: 'center' }}>
                      <Link to={`/prodUpdate/${item.id}`} className='text-decoration-none text-white justify-content-center'>
                        <i className='text-dark fa fa-edit'></i>
                      </Link>
                    </button>
                    |
                    <button
                      type='button'
                      onClick={() => handleDelete(item.id)}
                      className='btn btn-danger m-2'
                      style={{ width: '40px', height: '2rem', alignItems: 'center' }}
                    >
                      <i className='fa fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length > itemsPerPage && (
          <div className='pagination justify-content-center mb-4'>
            <button type='button' className='btn btn-primary mx-2' disabled={currentPage === 1} onClick={handlePreviousPage}>
              Previous
            </button>
            <button type='button' className='btn btn-primary mx-2' disabled={currentPage === totalPages} onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
        </div>
    </section>
  );
};

export default ProdList;
