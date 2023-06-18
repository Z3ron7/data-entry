import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './prodlist.css';

const ProdList = ({ customers, updateTable }) => {
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

  return (
    <section className='content-main'>
      <div className='product-display insurance-table'>
        <table className='table table-light table-striped table-bordered border-secondary'>
          <thead className='table-dark'>
            <tr>
              <th scope='row'>Customer_Id</th>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr key={item.id}>
                <th scope='row'>{item.id}</th>
                <td className='text-wrap'>{item.Name}</td>
                <td>
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
      </div>
    </section>
  );
};

export default ProdList;