import React from 'react'
import {  Route, Routes } from 'react-router-dom'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
    
    
  )
}

export default App