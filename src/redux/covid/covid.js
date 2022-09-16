import {
  getAllCountriesAPI,
  getCountryDetailsAPI,
  getAllCasesAPI,
} from '../../api/APIHelper';

const GET_ALL_COUNTRIES = 'covidTracker/GET_ALL_COUNTRIES';
const GET_REGIONS = 'covidTracker/GET_REGIONS';
const RESET_REGIONS = 'covidTracker/RESET_REGIONS';

const initialState = {
  countries: [],
  regions: { regions: [], total: 0 },
  total: 0,
  show: false,
};

export const getAllCountries = () => async (dispatch) => {
  const data = await getAllCountriesAPI();
  const total = await getAllCasesAPI();
  dispatch({
    type: GET_ALL_COUNTRIES,
    payload: {
      countries: data,
      total: total.cases,
    },
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
    payload: {
      regions,
      total_country:
        details.dates[keys[keys.length - 1]].countries[countryName]
          .today_confirmed,
    },
  });
};

export const resetRegions = () => ({ type: RESET_REGIONS });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload.countries,
        regions: { regions: [], total: 0 },
        total: action.payload.total,
        show: false,
      };

    case GET_REGIONS:
      return {
        ...state,
        regions: {
          regions: action.payload.regions,
          total: action.payload.total_country,
        },
        show: true,
      };

    case RESET_REGIONS:
      return { ...state, regions: { regions: [], total: 0 }, show: false };

    default:
      return state;
  }
};

export default reducer;
