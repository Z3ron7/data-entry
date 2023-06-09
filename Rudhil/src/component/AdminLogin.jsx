import React from 'react';
import { Link } from 'react-router-dom';

function loginadmin() {
  return (
    <div className='fluid bg-secondary'>

      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className="col-'12'">

          <div className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <div className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your username and password!</p>
              <div className="mb-2">
              <input className="lg form-control" label='Email address' id='formControlLg' type='email'/>
              </div>
              <div className="mb-4">
              <input className="lg form-control" label='Email address' id='formControlLg' type='password'/>
              </div>
              <button outline className='lg mx-2 px-5 text-dark' >
               <Link className="text-decoration-none" to="/admin">Login</Link> 
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>  
  );
}

export default loginadmin;