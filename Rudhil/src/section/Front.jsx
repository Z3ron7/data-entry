import React from 'react'
import Logo from '../pages/images/MY LOGO.png'
import Logo1 from '../pages/images/front1.png'
import './front.css'
export default function Front () {
    return (
        <div className="front"> 
      <div className="row">
      <div className='col-md-6 mt-5 d-flex justify-content-center'>
      <img src={Logo} className=" mx-auto d-block w-100 h-50 ms-4" alt="..." />
      </div>
      <div className="col-md-5 mt-4">
          <img
            src={Logo1}
            className="mx-auto d-block w-100 h-100 "
            alt="..."
          />
        </div>
        </div>
      </div>
    )
}
