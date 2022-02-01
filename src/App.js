import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCountries } from './redux/covid/covid';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Details from './components/Details/Details';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:country_name" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
