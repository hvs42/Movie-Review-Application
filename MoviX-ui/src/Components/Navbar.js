import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LoginContext } from '../Contexts/LoginContext';
import { logout } from '../Services/UserService';
import { toast } from 'react-toastify';

export default function Navbar() {

  const [showCollapsedMenu, setshowCollapsedMenu] = useState(false);

  const toggleMenu = () => {
    setshowCollapsedMenu(!showCollapsedMenu);
  }

  const show = showCollapsedMenu ? "show" : "";


  const loginContext = useContext(LoginContext);


  const logoutHandler = () => {
    loginContext.logout();

    logout().then(res => {
      toast.success(res.message);
    })
  }





  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MoviX</Link>
          <button onClick={toggleMenu} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show}`} id="navbarNav">
            <ul className='navbar-nav mb-2 mb-lg-0 text-uppercase'>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
              {loginContext.loggedInUser &&
                <React.Fragment>
                  {loginContext?.loggedInUser.role === 1 &&
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/movies/add">ADD NEW MOVIE</Link>
                    </li>}
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard">{loginContext.loggedInUser.name}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={logoutHandler}>Logout</Link>
                  </li>
                </React.Fragment>}
              {
                loginContext.loggedInUser === null &&
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">SignUp</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </React.Fragment>
              }

            </ul>

          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
