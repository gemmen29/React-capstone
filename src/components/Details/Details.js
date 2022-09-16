import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { IoEarth } from 'react-icons/io5';
import { getRegions } from '../../redux/covid/covid';

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.data.countries.filter(
    (region) => region.continent === params.country_name,
  ));
  const regions = useSelector((state) => state.data.regions);
  const [tempRegions, setTempRegions] = useState([]);

  useEffect(() => {
    if (country.length > 0) {
      setTempRegions(country[0].countries);
    }
  }, [country]);

  useEffect(() => {
    if (tempRegions.length > 0) {
      tempRegions.forEach((region) => {
        dispatch(getRegions(region));
      });
    }
  }, [tempRegions]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
  `;

  return (
    <>
      {regions.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="white" css={override} size={150} />
        </div>
      )}
      {regions.length > 0 && (
        <>
          <div className="flex justify-around items-center py-6 bg-sky-500">
            <IoEarth className="text-9xl" />
            <div className="flex flex-col items-end text-3xl font-semibold text-white">
              <span>
                <span className="flex flex-col items-end">
                  {params.country_name?.split(' ').map((piece) => (
                    <span key={piece}>{piece}</span>
                  ))}
                </span>
              </span>
              <span>{`${country[0].cases.toLocaleString('en-US')} cases`}</span>
            </div>
          </div>
          <div className="bg-sky-700 text-lg px-5 py-1 text-white">
            Continent Breakdown - 2022
          </div>
          {regions.length === 0 && (
            <div className="text-center text-white text-2xl text-bold py-2">
              No continent data found.
            </div>
          )}
          <ul className="flex flex-col">
            {regions.map((region) => (
              <li
                data-testid="listitem"
                key={region.name}
                className="flex justify-between items-center px-6 py-6 even:bg-sky-700 text-white text-3xl text-semibold"
              >
                <span className="flex flex-col items-start">
                  {region.name
                    .split('(')[0]
                    .split(' ')
                    .map((piece) => (
                      <span key={piece}>{piece}</span>
                    ))}
                </span>
                <span>{region.cases.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
