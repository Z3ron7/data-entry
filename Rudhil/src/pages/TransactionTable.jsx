import axios from 'axios';
import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import './transactionTable.css'

const TransactionTable = ({ customers, updateTable }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <section className='content-main'>
      <div className='display transaction-table min-vh-100'>
        <table className='table table-light table-striped table-bordered border-secondary'>
          <thead className='table-dark'>
            <tr>
              <th scope='row'>Id</th>
              <th>Policy #</th>
              <th>Names</th>
              <th>Transaction Date</th>
              <th>Due Date</th>
              <th>Category</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <th scope='row text-center'>{item.id}</th>
                <td className='text-center'>{item.policy}</td>
                <td className='text-wrap'>{item.name}</td>
                <td className='text-wrap'>{item.transac_date}</td>
                <td className='text-wrap'>{item.due_date}</td>
                <td>
                  <div className="column-list">
                    {item.list.split(',').map((name, index) => (
                      <div key={index} className="column-item text-primary">
                        {`${index + 1}. ${name.trim()}`}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="text-center" style={{alignItems: "center", justifyContent: 'center'}}>
                  <button type='button' className='btn btn-warning m-2' style={{ width: '40px', height: '2rem', alignItems: 'center', justifySelf: 'center' }}>
                    <Link to={`/transacUpdate/${item.id}`} className='text-decoration-none text-white justify-content-center'>
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

export default TransactionTable;