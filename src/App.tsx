import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Shared/Header/header';
import Search from './Components/Search/Search';
import WeatherDetails from './Components/WeatherDetails.tsx/WeatherDetails';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/weatherDetails" element={<WeatherDetails />} />
      </Routes>
    </>
  );
}

export default App;
