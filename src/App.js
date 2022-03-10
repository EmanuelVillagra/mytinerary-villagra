import './App.css';
import Indecs from './pages';
import Cities from './pages/cities'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import InConstruction from './components/inConstruction';
import DetailPage from './pages/cardDetails';
import { getAllCities } from './apiCall';
import { useState, useEffect } from 'react';


const App = () => {

  return (
    <div className='App'>
      <BrowserRouter >

      <Routes>
        <Route path='/' element={<Indecs/>}/>
        <Route path='*' element={<InConstruction/>}/>
        <Route path='/cities' element={<Cities/>} />
        <Route path='/cities/detail/:_id' element={<DetailPage/>}/>
      </Routes>
      
      
      
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
