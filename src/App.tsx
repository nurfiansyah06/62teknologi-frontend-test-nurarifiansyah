import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import Business from './pages/Business';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business" element={<Business />} />
        <Route path="/detail/:business_id" element={<Detail />} />
      </Routes>
    </Router>
  );
}


export default App;
function fetchData(): any {
  throw new Error('Function not implemented.');
}

