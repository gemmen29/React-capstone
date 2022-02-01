import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => (
  <div className={styles.Home}>
    <NavLink to={`/${'Test'}`}>Details</NavLink>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
