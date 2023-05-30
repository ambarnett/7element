import './App.css';
import React, { useEffect, useState } from 'react';
import { LoginPage } from './components/loginPage';
import { SignUpPage } from './components/signUpPage';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/homePage';
import { Events } from './components/eventsPage';
import { auth } from './config/firebase';
import { NavBar } from './components/navbar';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe();
  }, [])

  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = auth.currentUser;
        //check if the user is logged in and has the admin role
        if (user && user.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    checkAdminStatus();
  }, [])
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          { !user ? (
            <Route path='/' element={<Navigate to='/login' replace={true}/>}/>
          ) : (
              <Route path='/' element={<Navigate to='/homePage' replace={true} />} />
          )}
          <Route path='/homePage' element={ <HomePage /> } />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signUp' element={ <SignUpPage /> } />
          <Route path='/events' element={ <Events isAdmin={isAdmin} /> } />
        </Routes>
      </Router>
    </div>
  );
}