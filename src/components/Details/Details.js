import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getRegions } from '../../redux/covid/covid';
import styles from './Details.module.css';

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const regions = useSelector((state) => state.data.regions);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getRegions(params.country_name));
    }, 1000);
  }, [dispatch]);

  return (
    <ul className={`${styles.Home} flex flex-col`}>
      {regions.map((region) => (
        <li key={region.name}>{`${region.name} ${region.today_confirmed}`}</li>
      ))}
    </ul>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
