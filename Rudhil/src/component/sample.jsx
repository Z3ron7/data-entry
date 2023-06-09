import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isDataEntryOpen, setDataEntryOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleDataEntryCollapse = () => {
    setDataEntryOpen(!isDataEntryOpen);
  };

  return (
    <div className="position-fixed">
      <div className="row d-flex">
        <div className="col-auto col-sm-2 bg-white flex-column justify-content-start min-vh-100">
          <div className="mt-3">
            <a href="" className="text-decoration-none d-flex align-items-center text-black d-none d-sm-inline">
              <span className="fs-4">Rudhil</span>
            </a>
            <hr className="text-black d-none d-sm-block" />
            <ul className="nav nav-pills flex-column" id="parentM">
              <li className="nav-item my-1">
                <div className="sidbar-title">
                  <a
                    href="#submenu"
                    className="nav-link text-black d-flex justify-content-between align-items-center"
                    onClick={toggleDataEntryCollapse}
                    aria-expanded={isDataEntryOpen}
                  >
                    <div>
                      <i className="bi bi-clipboard-data" />
                      <span className="ms-2 d-none d-sm-inline">Data entry</span>
                    </div>
                    <i
                      className={`bi ${isDataEntryOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill toggle-btn'}`}
                    />
                  </a>
                </div>
                <ul
                  className={`nav collapse ms-1 flex-column ${isDataEntryOpen ? 'show' : ''}`}
                  id="submenu"
                  data-bs-parent="#parentM"
                  style={{ transitionDuration: isDataEntryOpen ? '0.5s' : '0.3s' }}
                >
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/CustomerEntry"
                      className={`nav-link text-black  ${activeLink === '/CustomerEntry' ? 'active' : ''}`}
                      onClick={() => handleLinkClick('/CustomerEntry')}
                      aria-current="page"
                    >
                      <i className="bi bi-person-vcard" />
                      <span className="ms-2 d-none d-sm-inline">Insurance</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/customerInsured"
                      className={`nav-link text-black  ${activeLink === '/customerInsured' ? 'active' : ''}`}
                      onClick={() => handleLinkClick('/customerInsured')}
                      aria-current="page"
                    >
                      <i className="bi bi-person-rolodex" />
                      <span className="ms-2 d-none d-sm-inline">Insured</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/coverage"
                      className={`nav-link text-black  ${activeLink === '/coverage' ? 'active' : ''}`}
                      onClick={() => handleLinkClick('/coverage')}
                      aria-current="page"
                    >
                      <i className="bi bi-hdd-stack" />
                      <span className="ms-2 d-none d-sm-inline">Coverage</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item my-1" id="triggerId" data-bs-toggle="collapse" aria-current="page">
                <NavLink
                  exact
                  to="/transaction"
                  className={`nav-link text-black  ${activeLink === '/transaction' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/transaction')}
                  aria-current="page"
                >
                  <i className="bi bi-grid" />
                  <span className="ms-2 d-none d-sm-inline">Transaction</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

/* 
/*Sidebar width */

.col-auto {
	width: 33vh;
}

@media (max-width: 700px) {
  .col-auto {
    max-width: 50%;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 576px) {
  .col-auto {
    max-width: 33%; /* Margin value for screens up to 576px wide */
  }
}

/* hover */

#parentM li a:hover,
#parentM li a:active,
#parentM li a.active {
  background-color: #c0c2c4;
  color: green !important;
}

.nav-link.active {
	background-color: #c0c2c4;
	color: green !important;
  } */

  /* .nav-pills li a:hover {
	background-color: blue;
  } */ */

  *{
    margin:0;
    padding:0;
    text-decoration: none;
  }
  main{
    width: 100%;
  }
  
  .sidebar{
    background: #000;
    color: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 200px;
    z-index: 1000;
    overflow-y: auto; 
    transition: all 0.5s;
  }
  .sidebar .top_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  .sidebar .top_section .logo {
    font-size: 20px;
    font-weight: bold;
  }
  
  .sidebar .top_section .bars {
    font-size: 24px;
    cursor: pointer;
    
  }

  .sidebar .link {
    display: flex;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    color: #fff;
    transition: background-color 0.3s;
  }
  .link:hover{
    background:lightskyblue;
    color: #000;
    transition: all 0.5s;
  }
  .sidebar .link.active {
    background-color: #555;
  }
  
  .sidebar .link .icon {
    margin-right: 10px;
  }
  
  .sidebar .link_text {
    display: none;
  }
  
  .sidebar.open .link_text {
    display: block;
  }
  
  
  
