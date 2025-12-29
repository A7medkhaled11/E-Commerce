import React from 'react'
import { useSelector } from 'react-redux'
import './dashboard.css'
import { Nav } from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';
export default function Dashboard() {
    const{isDark} = useSelector(state=>state.darkmode);
  return (
    <div className='vh-100 position-fixed general-dash '>
        <h5 className='mt-5 ms-2 fw-bold text-light'>
DashBoard        </h5>
<Nav className='ms-4 dash-links d-flex flex-column'>
    <NavLink to='/Dashusers' className='text-decoration-none text-light fw-bold '>
    Users
    </NavLink>
    <NavLink to='/Dashproducts' className='text-decoration-none text-light fw-bold '>
    Products
    </NavLink>
     <NavLink to='/Dashcarts' className='text-decoration-none text-light fw-bold '>
    Carts
    </NavLink>
</Nav>

    </div>
  )
}
