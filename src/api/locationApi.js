// src/api/locationApi.js

export const getAllCountries = async () => {
  const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
  const data = await res.json();
  return data.data.map((country) => country.name);
};

export const getCitiesByCountry = async (country) => {
  const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country }),
  });

  const data = await res.json();
  return data.data;
};
