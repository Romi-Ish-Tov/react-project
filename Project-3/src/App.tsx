import React, { useEffect, useMemo, useState } from 'react';
import GuestPageLayout from "./Components/MainPageComponents/GuestPageLayout/GuestPageLayout";
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { VacationClass } from './Types/class/Vacation';
import { setVacationsData } from './Redux/Features/VacationsController';
import DynamicPageLayout from './Components/DynamicPage/DynamicMainPage/DynamicPageLayout';
import VacationManagment from './Components/AdminViewComponent/VacationManagment/VacationManagment';
import userState from './Types/states/userState';
import AdminEditModal from './Components/DynamicPage/DynamicMainPage/AdminEditModal';
import "./App.css";

function App() {
  
  const guest: userState = {
    fullName: 'guest',
    userType: 'guest',
    email: 'guest@gmail.com',
    id: 0
  }

  const state:any = useSelector(state => state)
  const userId = 0
  const dispatch = useDispatch();

  const [user, setUser] = useState(guest);
  const value: any = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    initVacations();
  }, []);

  async function initVacations() {
    const response = await axios.get<VacationClass[]>(`http://localhost:3001/vacations/${userId}`);
    let vacationsModel = response.data;
    dispatch(setVacationsData({
      vacationsArray: vacationsModel,
    }));
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<GuestPageLayout />} />
        <Route path="/index" element={<DynamicPageLayout />} />
        <Route path="/vacationManagment" element={<VacationManagment />} />
        <Route path="/test" element={<AdminEditModal />} />
      </Routes>
    </div>
  );
}

export default App;
