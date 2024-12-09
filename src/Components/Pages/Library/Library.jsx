import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminRoute from '../../../Route/RouteDetails';


const Library = () => {
  return (
    <>
      <div>Library</div>
      <NavLink
        to= {AdminRoute.Library.CreateLibrary}
        className="btn custom-button-secondary fw-bold px-5 w-100"
      >
        go to create
      </NavLink></>


  )
}

export default Library