import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Home.module.css';

const Home = () => {
  const countries = useSelector((state) => state.countries);

  return (
    <div className={`${styles.Home} grid grid-cols-2`}>
      {Object.keys(countries).map((country) => (
        <NavLink key={country} to={`/${country}`}>
          {country}
        </NavLink>
      ))}
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
