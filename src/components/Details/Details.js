import React from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styles from './Details.module.css';

const Details = () => {
  const params = useParams();
  return <div className={styles.Details}>{params.country_name}</div>;
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
