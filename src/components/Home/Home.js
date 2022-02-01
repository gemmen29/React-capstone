import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

  const searchHandler = (e) => {
    const list = countries.filter((country) => country.name.toLowerCase().includes(e.target.value));
    setDisplayedCountries(list);
  };

  return (
    <>
      {`Total: ${totalNumber}`}
      <br />
      <input
        type="text"
        placeholder="Enter a country"
        onChange={searchHandler}
      />
      <div className={`${styles.Home} grid grid-cols-2`}>
        {displayedCountries.map((country) => (
          <NavLink
            key={country.name}
            to={`/${country.name}`}
            onClick={navlinkHandler}
          >
            {`${country.name} ${country.today_confirmed}`}
          </NavLink>
        ))}
      </div>
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
