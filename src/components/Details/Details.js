import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoEarth } from 'react-icons/io5';
import { getRegions } from '../../redux/covid/covid';

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
    <>
      <div className="flex justify-around items-center py-6 bg-sky-500">
        <IoEarth className="text-9xl" />
        <div className="flex flex-col items-end text-3xl font-semibold text-white">
          <span>
            <span className="flex flex-col items-end">
              {params.country_name.split(' ').map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </span>
          </span>
          <span>{`${regions.total.toLocaleString('en-US')} cases`}</span>
        </div>
      </div>
      <div className="bg-sky-700 text-lg px-5 py-1 text-white">
        Country Breakdown - 2022
      </div>
      <ul className="flex flex-col">
        {regions.regions.map((region) => (
          <li
            key={region.name}
            className="flex justify-between items-center px-6 py-6 even:bg-sky-700 text-white text-3xl text-semibold"
          >
            <span className="flex flex-col items-start">
              {region.name.split(' ').map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </span>
            <span>{region.today_confirmed.toLocaleString('en-US')}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
