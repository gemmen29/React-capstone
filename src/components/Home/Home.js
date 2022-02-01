import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetRegions } from '../../redux/covid/covid';
import styles from './Home.module.css';

const Home = () => {
  const countries = useSelector((state) => state.data.countries);
  const dispatch = useDispatch();

  const navlinkHandler = () => {
    dispatch(resetRegions());
  };

  return (
    <div className={`${styles.Home} grid grid-cols-2`}>
      {countries.map((country) => (
        <NavLink
          key={country.name}
          to={`/${country.name}`}
          onClick={navlinkHandler}
        >
          {`${country.name} ${country.today_confirmed}`}
        </NavLink>
      ))}
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
