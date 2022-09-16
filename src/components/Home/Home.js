import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoEarth } from 'react-icons/io5';
import { GrMapLocation } from 'react-icons/gr';
import { css } from '@emotion/react';
import { resetRegions } from '../../redux/covid/covid';
import styles from './Home.module.css';

const Home = () => {
  const { countries, total: totalNumber } = useSelector((state) => state.data);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const dispatch = useDispatch();

  const navlinkHandler = () => {
    dispatch(resetRegions());
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
  `;

  useEffect(() => {
    setDisplayedCountries(countries);
  }, [countries]);

  useEffect(() => {
    navlinkHandler();
  }, []);

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    const list = countries.filter((country) => country.continent.toLowerCase().includes(value));
    setDisplayedCountries(list);
  };

  return (
    <>
      {countries.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="white" css={override} size={150} />
        </div>
      )}
      {countries.length > 0 && (
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
                key={country.continent}
                className={`${styles.navlinks} py-3 px-2 bg-sky-700`}
              >
                <NavLink
                  key={country.continent}
                  to={`/${country.continent}`}
                  onClick={navlinkHandler}
                  className="w-full h-full flex flex-col items-center"
                >
                  <GrMapLocation className="text-8xl text-center" />
                  <div className="ml-auto text-white flex flex-col justify-end text-3xl font-bold items-end grow">
                    <span className="flex flex-col items-end">
                      {country.continent.split(' ').map((piece) => (
                        <span key={piece}>{piece.split('-')[0]}</span>
                      ))}
                    </span>
                    <span>{country.cases.toLocaleString('en-US')}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
