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
    <div className="m-2 p-2">
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
                      <i className="bi bi-clipboard-data fs-5" />
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
                      <i className="bi bi-person-vcard fs-5" />
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
                      <i className="bi bi-person-rolodex fs-5" />
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
                      <i className="bi bi-hdd-stack fs-5a" />
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