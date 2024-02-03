import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/LoginContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddMovie from './AddMovie';
import UpdateMovie from './UpdateMovie';
import Footer from '../../Components/Footer';

export default function Admin() {

  const loginContext = useContext(LoginContext);


  return (
    <React.Fragment>
      {loginContext.loggedInUser === null && <Navigate to="/login" replace />}
      {loginContext.loggedInUser?.role === 0 && <Navigate to="/user/dashboard" replace />}
      <Routes>
        <Route path="/movies/add" element={<AddMovie />} />
        <Route path="/movies/update/:movieId" element={<UpdateMovie />} />
      </Routes>
      <Footer />
    </React.Fragment>
  )
}
