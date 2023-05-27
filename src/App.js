import './App.css';
import React from 'react';
import { LoginPage } from './components/loginPage';
import { SignUpPage } from './components/signUpPage';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/homePage';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace={true} />}/>
          <Route path='/homePage' element={ <HomePage /> } />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signUp' element={ <SignUpPage /> } />
        </Routes>
      </Router>
    </div>
  );
}