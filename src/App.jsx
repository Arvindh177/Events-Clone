
import './App.css'
import {Routes,Route} from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect, useState } from 'react'
import AccountPage from './pages/Account'

axios.defaults.baseURL = 'http://127.0.0.1:4000' 
axios.defaults.withCredentials = true;

function App() {

  

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/:subpage?' element={<AccountPage/>}/>
        </Route>
        
      </Routes>

    </UserContextProvider>
      

    
  )
}

export default App