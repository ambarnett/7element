import './App.css';
import React, { useEffect, useState } from 'react';
import { LoginPage } from './components/loginPage';
import { SignUpPage } from './components/signUpPage';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/homePage';
import { Events } from './components/eventsPage';
import { auth, db } from './config/firebase';
import { NavBar } from './components/navbar';
import { Players } from './components/playersPage';
import { getDoc, doc, } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { UserProfile } from './components/userProfilePage';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  const { currentUser } = getAuth();

  const checkAdminStatus = async () => {
    console.log('check admin status on app.js')
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Fetch user data from Firestore
        const userRef = doc(db, 'users', user.uid)
        const userSnapshot = await getDoc(userRef)
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          if (userData && userData.isAdmin) {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }
        }
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error(error.toString())
    }
  }

  const unsubscribe = auth.onAuthStateChanged((user) => {
    setUser(user)
    setLoading(false)
  })

  useEffect(() => {
    unsubscribe();
    checkAdminStatus();
  }, [unsubscribe])
  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
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
          <Route path='/players' element={ <Players isAdmin={ isAdmin } /> } />
          <Route path='/profile' element={ <UserProfile currentUser={ currentUser } /> } />
        </Routes>
      </Router>
    </div>
  );
}