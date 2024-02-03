import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { LoginContext } from '../../Contexts/LoginContext';
import { Button } from 'reactstrap';
import userImg from '../../Static/Images/UserImages/user.png'
import '../../Static/Styles/UserStyles/Dashboard.css'
import { deleteUser, getProfilePicture } from '../../Services/UserService';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../Services/helper';

export default function Dashboard() {

  const loginContext = useContext(LoginContext);

  const user = loginContext.loggedInUser
  const image = loginContext?.loggedInUser?.profileImage;


  console.log(user);
  // console.log("rerender dash");
  console.log(image);

  // getProfilePicture(user.userId).then(res => {
  //   setimage(res);
  // })


  return (
    <React.Fragment>
      <div className='card mr-4 profile'>
        <div className="card-body">
          <div className='container text-center'>
            {image ? <img src={image} className='profile-image' alt="Actual" /> : <img src={userImg} className='profile-image' alt='Default' />}
            {/* <img className='profile-image' src={user?.profileImage} alt="Profile Image" /> */}
            <h1 className='mt-3 mb-5'>{loginContext?.loggedInUser?.name}</h1>
            <div className="table-responsive">
              <table className='table table-dark table-striped'>
                <thead>
                  {/* ID */}
                  <tr>
                    <th scope='col' style={{ width: '40%' }}>#ID</th>
                    <th scope='col' style={{ width: '60%' }}> {`MOVIX2023USER${loginContext?.loggedInUser?.userId}`}</th>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{user?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{user?.role === 0 ? `Normal` : `Admin`}</td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>{user?.about === null ? `Add about yourself` : user?.about}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
