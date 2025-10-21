import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Garden from './pages/Garden'
import Profile from './pages/Profile';
import GenerateIdeas from './pages/GenerateIdeas';
import GenerateScripts from './pages/GenerateScripts';
import GenerateSEO from './pages/GenerateSEO';
import SavedDashboard from './pages/SavedDashboard';


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
      <Route path="/profile" element={<Profile />} />
      <Route path="/generate-ideas" element={<GenerateIdeas/>}/>
      <Route path="/generate-script" element={<GenerateScripts/>}/>
      <Route path="/generate-seo" element={<GenerateSEO/>}/>
      <Route path="/saved-dashboard" element={<SavedDashboard/>}/>


    </Routes>
    </TooltipProvider>
    
  )
}

export default App