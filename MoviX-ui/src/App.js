import './App.css';
import Navbar from './Components/Navbar';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MoviesFeed from './Pages/MoviePages/MoviesFeed';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { ToastContainer } from 'react-toastify'
import MovieDetails from './Pages/MoviePages/MovieDetails';
import { injectStyle } from "react-toastify/dist/inject-style";
import { LoginContext } from './Contexts/LoginContext';
import User from './Pages/UserPages/User';
import Admin from './Pages/AdminPages/Admin';
import { BASE_URL } from './Services/helper';
import AboutUs from './Pages/AboutUs';

function App() {
  injectStyle();



  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if (sessionStorage.getItem("loggedInUser")) {
      const localUser = sessionStorage.getItem("loggedInUser");
      console.log("user login");
      const user = JSON.parse(localUser);
      console.log(user.userId);
      setLoggedInUser({
        userId: user.userId,
        about: user.about,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        role: user.role
      });
    }
    setIsLoaded(true);
  }, [])

  const login = (userData) => {
    console.log(userData);
    let image = userData.profileImage ? BASE_URL + "/users/image/" + userData.userId : null;
    // image = BASE_URL + "/users/image/" + userData?.userId;

    userData = { ...userData, profileImage: image }
    sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
    setLoggedInUser(userData);
    console.log(loggedInUser);
  }

  const logout = () => {
    console.log("inside logout");
    sessionStorage.clear();
    setLoggedInUser(null);
  }

  const addImage = () => {
    console.log("Adding image");
    const img = BASE_URL + "/users/image/" + loggedInUser?.userId;
    const user = { ...loggedInUser, profileImage: img };
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
  }

  console.log(loggedInUser);

  if (isLoaded === true) {
    return (
      <LoginContext.Provider value={{ loggedInUser, login, logout, addImage }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<MoviesFeed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/movies/details/:movieId" element={<MovieDetails />} />
          <Route path='/logout' element={<Navigate to="/" />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <ToastContainer />
      </LoginContext.Provider>

    );
  }
}


export default App;