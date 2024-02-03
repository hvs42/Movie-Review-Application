import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/LoginContext';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import '../../Static/Styles/UserStyles/Sidebar.css'
import { Icon } from 'semantic-ui-react';
import ChangePassword from '../../Components/Users/ChangePassword';
import { deleteUser } from '../../Services/UserService';
import ChangeProfileImage from '../../Components/Users/ChangeProfileImage';
import Footer from '../../Components/Footer';

export default function User() {


  const loginContext = useContext(LoginContext);

  console.log(loginContext.loggedInUser);



  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector('.content');

    console.log(sidebar);
    console.log(content);

    if (sidebar.style.display !== 'none') {
      // If sidebar is visible, close it
      sidebar.style.display = 'none';
      content.style.marginLeft = '0%';
    } else {
      // If sidebar is not visible, make it visible
      sidebar.style.display = 'block';
      content.style.marginLeft = '0%';
    }
  }

  const activateLink = (e) => {
    const links = document.querySelectorAll(".item");

    links.forEach(link => {
      link.classList.remove('active');
      console.log(link);
    })
    e.target.classList.add('active');

    console.log(e.target);
  }


  const doLogOut = () => {
    loginContext.logout();
  }

  const deactivate = () => {
    if (window.confirm("Are you sure you want to Deactivate your account?")) {
      loginContext.logout();
      deleteUser(loginContext.loggedInUser.userId);
    }
  }



  return (
    <div className='user-base'>
      {loginContext.loggedInUser === null && <Navigate to="/login" />}
      <div className='sidebar'>

        <Link id='dashboard' className='item active' onClick={activateLink} to="/user/dashboard"><Icon name='dashboard'></Icon>  Dashboard</Link>
        <Link id='password' className='item' onClick={activateLink} to="/user/changepassword"><Icon name='settings' ></Icon>  Change Password</Link>
        <Link id='change-image' className='item' onClick={activateLink} to="/user/changeprofileimage"><Icon name='image'></Icon>   Change Profile Photo</Link>

        <Link id='logout' className='item' onClick={doLogOut} to="/logout"><Icon name='sign-out'></Icon>  Logout</Link>
        <Link id='deactivate' className='deactivate item' onClick={deactivate}><Icon name='user delete'></Icon>  Deactivate Account</Link>

        <div className='divider'></div>
      </div>

      <div className='content'>
        <div className='content-base'>
          <Icon name='bars' onClick={toggleSidebar} color='grey' size='large' style={{ cursor: 'pointer', marginLeft: '2%', zIndex: '999' }} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/changeprofileimage' element={<ChangeProfileImage />} />
          </Routes>
        </div>
        <Footer />
      </div>

    </div>
  )
}
