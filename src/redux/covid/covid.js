import { getAllCountriesAPI, getCountryDetailsAPI } from '../../api/APIHelper';

const GET_ALL_COUNTRIES = 'covidTracker/GET_ALL_COUNTRIES';
const GET_REGIONS = 'covidTracker/GET_REGIONS';
const RESET_REGIONS = 'covidTracker/RESET_REGIONS';

const initialState = { countries: [], regions: [] };

export const getAllCountries = () => async (dispatch) => {
  const countries = await getAllCountriesAPI();
  const keys = Object.keys(countries.dates);
  const countriesForDispatch = countries.dates[keys[keys.length - 1]].countries;

  dispatch({
    type: GET_ALL_COUNTRIES,
    payload: countriesForDispatch,
  });
};

export const getRegions = (countryName) => async (dispatch) => {
  const details = await getCountryDetailsAPI(countryName);
  const keys = Object.keys(details.dates);

  const regions = details.dates[keys[keys.length - 1]].countries[
    countryName
  ].regions.map((region) => ({
    name: region.name,
    today_confirmed: region.today_confirmed,
  }));

  dispatch({
    type: GET_REGIONS,
    payload: regions,
  });
};

export const resetRegions = () => ({ type: RESET_REGIONS });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { countries: action.payload, regions: [] };

    case GET_REGIONS:
      return { ...state, regions: action.payload };

    case RESET_REGIONS:
      return { ...state, regions: [] };

    default:
      return state;
  }
};

export default reducer;
