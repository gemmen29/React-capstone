const baseURL = 'https://api.covid19tracking.narrativa.com/api';

export const getAllCountriesAPI = async () => {
  const response = await fetch(`${baseURL}?date_from=2022-01-31`);
  const data = await response.json();
  return data;
};

export const getCountryDetailsAPI = async (countryName) => {
  const response = await fetch(
    `${baseURL}/country/${countryName}?date_from=2022-01-31`,
  );
  const data = await response.json();
  return data;
};
