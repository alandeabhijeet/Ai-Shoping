import axios from 'axios';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './components/Home';
import Order from './components/Order';
import User from './components/User';
import Ai from './components/Ai';
import List from './components/List';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Error from './components/Error';
import AddProduct from './components/AddProduct';
import Review from './components/Review';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={ <Order/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/ai" element={<Ai/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/list/review" element={<Review />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

