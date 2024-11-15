import './App.css'
import LeadsList from './components/LeadsList'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FollowUps from './components/FollowUps'
import Register from './Auth/Register'
import Login from './Auth/Login'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import Dashboard from './components/Dashboard'
import CreateLead from './components/CreateLead'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  
  const {user} = useContext(AppContext);

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}> 
                <Route index element={user ? <Dashboard/> : <Login />} />
                <Route path='/leads' element={user ? <LeadsList /> : <Login />} />
                <Route path='/followups' element={user ? <FollowUps /> : <Login />} />
                <Route path='/create-lead' element={user ? <CreateLead /> : <Login />} />


                <Route path='/register' element={ user ? <Dashboard/> : <Register />} />
                <Route path='/login' element={ user ? <Dashboard/> : <Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

