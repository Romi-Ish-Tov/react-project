import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { VacationClass } from '../../Types/class/Vacation';
import { setVacationsData } from '../../Redux/Features/VacationsController';
import DataGraphs from './DataGraphs/DataGraphs';

import DataTable from "./Table/Table";

function AdminOverView() {
  
  return (
    // <div><DataGraphs/></div>
    <div><DataTable/></div>

  )
}

export default AdminOverView