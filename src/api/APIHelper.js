const baseURL = 'https://disease.sh/v3/covid-19';

export const getAllCasesAPI = async () => {
  const response = await fetch(`${baseURL}/all`);
  const data = await response.json();
  return data;
};

export const getAllCountriesAPI = async () => {
  const response = await fetch(`${baseURL}/continents`);
  const data = await response.json();
  return data;
};

export const getCountryDetailsAPI = async (countryName) => {
  const response = await fetch(`${baseURL}/countries/${countryName}`);
  const data = await response.json();
  return data;
};
