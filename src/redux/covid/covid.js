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
  regions: [],
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
  const regions = {
    name: details.country,
    cases: details.cases,
  };
  dispatch({
    type: GET_REGIONS,
    payload: regions,
  });
};

export const resetRegions = () => ({ type: RESET_REGIONS });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload.countries,
        regions: [],
        total: action.payload.total,
        show: false,
      };

    case GET_REGIONS:
      return {
        ...state,
        regions: [...state.regions, action.payload],
        show: true,
      };

    case RESET_REGIONS:
      return { ...state, regions: [], show: false };

    default:
      return state;
  }
};

export default reducer;
