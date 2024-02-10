// Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './SideBar.css'; // Import CSS file for styling
import { ReactComponent as LogoutLogo } from '../../assets/icons/logout.svg';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token from local storage
    localStorage.removeItem('token');
    // Redirect user to the login page
    navigate('/login');
  };

  return (
    <div className="sidebar shadow p-3 mb-5 bg-white rounded">
      <div className="sidebar-title">BookVerse</div>
      <ul className="sidebar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/authors">Authors</Link></li>
        {/* Add more menu items as needed */}
      </ul>
      <div className='user'>Klifford</div>
      <div className='logout d-flex' onClick={handleLogout}>
        <LogoutLogo style={{ width: '20px', height: '20px', marginRight: '10px' }}/>
        <div >Log Out</div>
      </div>
    </div>
  );
};

export default Sidebar;
