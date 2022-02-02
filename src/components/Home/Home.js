import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoEarth } from 'react-icons/io5';
import { GrMapLocation } from 'react-icons/gr';
import { resetRegions } from '../../redux/covid/covid';
import styles from './Home.module.css';

const Home = () => {
  const { countries, total: totalNumber } = useSelector((state) => state.data);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const dispatch = useDispatch();

  const navlinkHandler = () => {
    dispatch(resetRegions());
  };

  useEffect(() => {
    setDisplayedCountries(countries);
  }, [countries]);

  useEffect(() => {
    navlinkHandler();
  }, []);

  const searchHandler = (e) => {
    const list = countries.filter(
      (
        country, // eslint-disable
      ) => country.name.toLowerCase().includes(e.target.value.toLowerCase()), // eslint-disable
    );
    setDisplayedCountries(list);
  };

  return (
    <>
      <div className="flex justify-around items-center bg-sky-500">
        <IoEarth className="text-9xl" />
        <div className="flex flex-col items-center text-2xl font-semibold text-white">
          <span>All Countries Cases</span>
          <span>{`Total: ${totalNumber.toLocaleString('en-US')}`}</span>
        </div>
      </div>
      <div className="bg-sky-500 py-2 flex justify-center">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={searchHandler}
          className="shadow appearance-none border rounded w-4/12 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <ul className="grid grid-cols-2">
        {displayedCountries.map((country) => (
          <li
            data-testid="listitem"
            key={country.name}
            className={`${styles.navlinks} py-3 px-2 bg-sky-700`}
          >
            <NavLink
              key={country.name}
              to={`/${country.name}`}
              onClick={navlinkHandler}
              className="w-full flex flex-col items-center"
            >
              <GrMapLocation className="text-8xl text-center" />
              <div className="ml-auto text-white flex flex-col gap-2 text-3xl font-bold items-end">
                <span className="flex flex-col items-end">
                  {country.name.split(' ').map((piece) => (
                    <span key={piece}>{piece}</span>
                  ))}
                </span>
                <span>{country.today_confirmed.toLocaleString('en-US')}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
