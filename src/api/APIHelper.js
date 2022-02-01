const baseURL = 'https://api.covid19tracking.narrativa.com/api';

const getAllCountriesData = async () => {
  const response = await fetch(`${missionsURL}?date_from=2022-01-31`);
  const data = await response.json();
  return data;
};

getCountryDetails = async (countryName) => {
  const response = await fetch(
    `${missionsURL}/country/${countryName}?date_from=2022-01-31`,
  );
  const data = await response.json();
  return data;
};
