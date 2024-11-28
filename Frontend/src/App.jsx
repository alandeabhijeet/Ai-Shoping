import axios from 'axios';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './components/Home';
import Order from './components/Order';
import User from './components/User';
import Ai from './components/Ai';
import List from './components/List';
import Detail from './components/Detail';

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
        <Route path="/list/:id" element={<Detail/>} />
      </Routes>
    </Router>
  );
}

export default App;

