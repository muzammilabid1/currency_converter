import axios from "axios";

const api = axios.create({
  baseURL:
    "https://v6.exchangerate-api.com/v6",
});

//get api
export const fetchApi = async (from,to) => {
  const response = await api.get(`/bc8befd5094d2c2267ec4914/latest/${from}`);
  return response.data.conversion_rates[to];
};
