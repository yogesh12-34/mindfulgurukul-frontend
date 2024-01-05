import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ViewDetails from './pages/ViewDetails'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import Login from './pages/Login'
import { history } from './services/axios'

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/view-details/:userId' element={<ViewDetails />} />
        <Route path='/edit-user/:userId' element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
