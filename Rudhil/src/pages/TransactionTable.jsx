import axios from 'axios';
import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import './transactionTable.css'

const TransactionTable = ({ customers, updateTable, searchQuery  }) => {
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
  const currentItems = customers.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.policy.toString().includes(searchQuery.toLowerCase()) ||
  item.transac_date.toString().includes(searchQuery.toLowerCase()) ||
  item.due_date.toString().includes(searchQuery.toLowerCase()) ||
  item.list.toLowerCase().includes(searchQuery.toLowerCase())
).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <section className='container-fluid position-relative'>
      <div className='transaction-table min-vh-100'>
      <div className='row'>
          <div className='col-2'></div>
        <div className='col'>
        <table className='table table-light table-striped table-bordered border-secondary'>
          <thead className='table-dark'>
            <tr>
              <th className='text-center' scope='row'>ID</th>
              <th className="text-center">Policy #</th>
              <th className="text-center">Names</th>
              <th className="text-center">Transaction Date</th>
              <th className="text-center">Due Date</th>
              <th className="text-center">Category</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <th className='text-center' scope='row'>{item.id}</th>
                <td className='text-center'>{item.policy}</td>
                <td className='text-wrap'>{item.name}</td>
                <td className='text-center'>{item.transac_date}</td>
                <td className='text-center'>{item.due_date}</td>
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
                <Link to={`/transacUpdate/${item.id}`} className='text-decoration-none text-white justify-content-center'>
                  <button type='button' className='btn btn-warning m-2' style={{ width: '40px', height: '2rem', alignItems: 'center', justifySelf: 'center' }}>
                      <i className='text-dark fa fa-edit'></i>
                      </button>
                  </Link>
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
        <div className='mb-3'>
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
      </div>
      </div>
      </div>
    </section>
  );
};

export default TransactionTable;