import React, { useEffect, useMemo, useState } from 'react';
import GuestPageLayout from "./Components/MainPageComponents/GuestPageLayout/GuestPageLayout";
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, setVacationsData } from './Redux/Features/VacationsController';
import DynamicPageLayout from './Components/DynamicPage/DynamicMainPage/DynamicPageLayout';
import VacationManagment from './Components/AdminViewComponent/VacationManagment/VacationManagment';
import userState from './Types/states/userState';
import DataGraphs from './Components/AdminViewComponent/DataGraphs/DataGraphs';
import initVacations from './Utils/InitVacations';
import NewVacation from './Components/AdminViewComponent/NewVacation/NewVacation';
import "./App.css";

function App() {

  const guest: userState = {
    fullName: 'guest',
    userType: 'guest',
    email: 'guest@gmail.com',
    id: 0
  }

  const state: any = useSelector(state => state)
  const userId = 0
  const dispatch = useDispatch();

  const [user, setUser] = useState(guest);
  const value: any = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    initAllVacations();
  }, []);


  const initAllVacations = async () => {
    try {
      let vacationsArrayResponse = await initVacations(userId);
      dispatch(setVacationsData({
        vacationsArray: vacationsArrayResponse,
      }));
    }
    catch (e: any) {
      console.error(e.message);
      alert('Something went wrong. Please try again later!')
    }
  }

  dispatch(fetchUserById())

  // async function initVacations() {
  //   try {
  //     const response = await axios.get<VacationClass[]>(`http://localhost:3001/vacations/${userId}`);
  //     let vacationsModel = response.data;
  //     dispatch(setVacationsData({
  //       vacationsArray: vacationsModel,
  //     }));
  //   } catch (e: any) {
  //     console.error(e.message);
  //     alert('Something went wrong. Please try again later!')
  //   }
  // } 

  return (
    <div>
      <Routes>
        <Route path="/" element={<GuestPageLayout />} />
        <Route path="/index" element={<DynamicPageLayout />} />
        <Route path="/vacationManagment" element={<VacationManagment />} />
        <Route path="/graph" element={<DataGraphs />} />
        <Route path="/test" element={<NewVacation />} />
      </Routes>
    </div>
  );
}

export default App;