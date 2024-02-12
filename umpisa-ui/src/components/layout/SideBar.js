import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './SideBar.css'; // Import CSS file for styling
import { ReactComponent as LogoutLogo } from '../../assets/icons/logout.svg';
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Decode token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      // Get user name from decoded token
      const { userName } = decodedToken;
      setUserName(userName);
    }
  }, []);

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
      <div className='user'>{userName}</div> {/* Display user name */}
      <div className='logout d-flex' onClick={handleLogout}>
        <LogoutLogo style={{ width: '20px', height: '20px', marginRight: '10px' }}/>
        <div >Log Out</div>
      </div>
    </div>
  );
};

export default Sidebar;
