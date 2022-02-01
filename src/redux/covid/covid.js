import { getAllCountriesAPI, getCountryDetailsAPI } from '../../api/APIHelper';

const GET_ALL_COUNTRIES = 'covidTracker/GET_ALL_COUNTRIES';
const GET_COUNTRY_DETAILS = 'covidTracker/GET_COUNTRY_DETAILS';

const initialState = {};

export const getAllCountries = () => async (dispatch) => {
  const countries = await getAllCountriesAPI();
  const keys = Object.keys(countries.dates);
  const countriesForDispatch = countries.dates[keys[keys.length - 1]].countries;

  dispatch({
    type: GET_ALL_COUNTRIES,
    payload: countriesForDispatch,
  });
};

export const getCountryDetails = (countryName) => async (dispatch) => {
  const countryDetails = await getCountryDetailsAPI(countryName);

  const countryDetailsForDispatch = [...countryDetails];

  dispatch({
    type: GET_COUNTRY_DETAILS,
    payload: countryDetailsForDispatch,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return action.payload;

    case GET_COUNTRY_DETAILS:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
