import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Garden from './pages/Garden'

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/garden" element={<Garden />} />

    </Routes>
    </TooltipProvider>
    
  )
}

export default App