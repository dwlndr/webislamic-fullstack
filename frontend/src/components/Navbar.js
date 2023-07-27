import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from './assalamualaikum.svg';
import './css/nav/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('');

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      Cookies.remove('refreshToken');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const Home = () => {
    navigate('/home');
  };

  const Sholat = () => {
    navigate('/sholat');
  };

  const Alquran = () => {
    navigate('/alquran');
  };

  const Akun = () => {
    navigate('/account');
  };

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="logo-image">
            <img src={logo} alt="Logo" />
          </div>

          <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className='navbar-item'>
              <a onClick={() => { handleTabClick('home'); Home(); }} className={`navbar-item ${activeTab === 'home' ? 'active' : ''}`}>
                Home
              </a>
            </div>
            <div className='navbar-item'>
              <a onClick={() => { handleTabClick('sholat'); Sholat(); }} className={`navbar-item ${activeTab === 'sholat' ? 'active' : ''}`}>
                Prayer Schedule
              </a>
            </div>
            <div className='navbar-item'>
              <a onClick={() => { handleTabClick('alquran'); Alquran(); }} className={`navbar-item ${activeTab === 'alquran' ? 'active' : ''}`}>
                Al-qur'an
              </a>
            </div>
            <div className='navbar-item'>
              <a onClick={() => { handleTabClick('account'); Akun(); }} className={`navbar-item ${activeTab === 'account' ? 'active' : ''}`}>
                Account
              </a>
            </div>
            <div className="navbar-item">
              <div className="button-logout">
                <button onClick={Logout} className="button">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
