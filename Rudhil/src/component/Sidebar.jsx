import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import Logo from '../pages/images/rudhil_logo.png';
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
    <div className="">
      <div className="row">
        <div className="col-auto w-100 bg-white justify-content-start min-vh-100">
          <div className="mt-2">
            <a href="/customer-entry" className="text-decoration-none d-flex align-items-center text-black d-none d-sm-inline">
              <img className="ms-2 mx-3" alt='Rudhil logo' src={Logo} style={{width:"55px", height: "51px"}}/>
              <span className="fs-4" style={{fontWeight: 'bold'}}>Rudhil</span>
            </a>
            <hr className="text-black d-none d-sm-block font-weight-bold" />
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
                      <i className="bi bi-clipboard-data fs-5" />
                      <span className="ms-2 d-none d-sm-inline">Data entry</span>
                    </div>
                    <i
                      className={`bi ${isDataEntryOpen ? 'bi-caret-up-fill toggle-btn' : 'bi-caret-up-fill toggle-btn rotate'}`}
                    />
                  </a>
                </div>
                <ul
                  className={`nav collapse ms-1 flex-column ${isDataEntryOpen ? 'show' : ''}`}
                  id="submenu"
                  data-bs-parent="#parentM"
                  style={{ transitionDuration: isDataEntryOpen ? '0.9s' : '0.3s' }}
                >
                  <li className="nav-item my-1">
                    <NavLink
                      exact
                      to="/customer-entry"
                      className={`nav-link text-black w-100 ${activeLink === '/customer-entry' ? 'active' : ''}`}
                      onClick={() => handleLinkClick('/customer-entry')}
                      aria-current="page"
                    >
                      <i className="bi bi-person-vcard fs-5" />
                      <span className="ms-2 d-none d-sm-inline">Insurance</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/customerInsured"
                      className={`nav-link text-black w-100 ${activeLink === '/customerInsured' ? 'active' : ''}`}
                      onClick={() => handleLinkClick('/customerInsured')}
                      aria-current="page"
                    >
                      <i className="bi bi-person-rolodex fs-5" />
                      <span className="ms-2 d-none d-sm-inline">Insured</span>
                    </NavLink>
                  </li>
                  <li className="nav-item my-1">
                    <NavLink
                      exact
                      to="/coverage"
                      className={`nav-link text-black w-100 ${activeLink === '/coverage' ? 'active' : ''}`}
                      onClick={() => handleLinkClick('/coverage')}
                      aria-current="page"
                    >
                      <i className="bi bi-hdd-stack fs-5a" />
                      <span className="ms-2 d-none d-sm-inline">Coverage</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <hr className="text-black" />
              <li className="nav-item">
                <NavLink
                  exact
                  to="/transaction"
                  className={`nav-link text-black w-100 ${activeLink === '/transaction' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/transaction')}
                  aria-current="page"
                >
                  <i className="bi bi-grid fs-5" />
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