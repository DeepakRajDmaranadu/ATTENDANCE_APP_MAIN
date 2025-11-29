import React, { useEffect } from 'react'
import HomePage from './pages/HomePage'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import AllSubjects from './pages/AllSubjects'
import Analysis from './pages/Analysis'
import Attendance from './pages/Attendance'
const App = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/allsubjects' element={<AllSubjects/>}/>
        <Route path='/analysis' element={<Analysis/>}/>
        <Route path='/attendance' element={<Attendance/>}/>
      </Routes>
    </div>
  )
}

export default App
