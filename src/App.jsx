import { useState } from 'react'

import LoginForm from "./components/loginform";
import Register from './components/register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  const type = localStorage.getItem("type");
  console.log(type)
  return (
    <div className="page">
      <Router>
    {/* <TopBar /> */}
      <Routes>
        <Route exact path="/" element={
          (type ? (type==="staff" ? <AdminDashboard /> : <UserDashboard />): <LoginForm />)
        } />
        {/* <Route path="/staff" element={<AdminDashboard />} />
        <Route path="/student" element={<UserDashboard />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
