import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.css';
import ProjectInfo from './components/ProjectInfo';


function App() {

  return (
<>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Dashboard/>}/>
      <Route path='/projects/:id' element ={<ProjectInfo/>}/>
    </Routes>
    
    </BrowserRouter>
</>
  )
}

export default App
