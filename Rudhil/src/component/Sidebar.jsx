import React from 'react'

function Sidebar() {
  return (
    <div>
        <div className='m-2'>
            <i className='bi bi-boostrap-fill me-2 fs-4'></i>
            <span className='brand-name fs-4'>Admin</span>
        </div>
        <hr className='text-dark' />
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2'>
                <i className='bi bi-speedometer2 fs-5'></i>
                <span className='fs-5'>Dashboard</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-house fs-4 me-2'></i>
                <span className='fs-5'>Home</span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-people fs-4 me-2'></i>
                <span className='fs-5'>Insurance</span>
            </a>
        </div>
    </div>
  )
}

export default Sidebar