import React from 'react'
import Table from "../Table/Table"
import ResponsiveAppBar from "../../MainPageComponents/Navbar/NavBar"
import { useSelector } from 'react-redux'
import { UserClass } from '../../../Types/class/UserClass'
import { useNavigate } from 'react-router-dom'

const VacationManagment = () => {
    const state: any = useSelector(state => state);
    const user: UserClass = state.user.user;
    const userType = user.userType
    const navigate = useNavigate()
    
    if (userType != 'admin') {
        navigate('/index');    
    }
  return (
    <div>
        <ResponsiveAppBar/>
        <Table/>
    </div>
  )
}

export default VacationManagment