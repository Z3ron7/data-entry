import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './prodlist.css';
import './transaction.css'

const TransactionTable = ({ customers, updateTable }) => {
  const handleDelete = async function (id) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/transaction/delete/${id}`);
        updateTable();
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <section className='content-main'>
      <div className='product-display transaction-table'>
        <table className='table table-light table-striped table-bordered border-secondary'>
          <thead className='table-dark'>
            <tr>
              <th scope='row'>Id</th>
              <td>Policy #</td>
              <td>Names</td>
              <td>Transaction Date</td>
              <td>Due Date</td>
              <td>Category</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr key={item.id}>
                <th scope='row'>{item.id}</th>
                <td className='text-wrap'>{item.policy}</td>
                <td className='text-wrap'>{item.name}</td>
                <td className='text-wrap'>{item.transac_date}</td>
                <td className='text-wrap'>{item.due_date}</td>
                <td>
                  <div className="column-list">
                    {item.list.split(',').map((name, index) => (
                      <div key={index} className="column-item">
                        {`${index + 1}. ${name.trim()}`}
                      </div>
                    ))}
                  </div>
                </td>
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

export default TransactionTable;