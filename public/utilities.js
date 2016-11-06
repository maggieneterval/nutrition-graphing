const USDA_API_KEY = 'L0KvYqApfb8ELlfTmqFzE4SB9xGPNL6EIYi5S2Vu';
//todo - add to config vars, move all api requests to server

function fetchNutritionReport (ndbno, reportType, apiKey) {
  return fetch(`https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=${reportType}&format=json&api_key=${apiKey}`)
    .then(res => res.json());
}

function calculatePercentDV (nutrient) {
  if (!rdv[nutrient.name] || rdv[nutrient.name].unit !== nutrient.unit) return;
  const itemAmount = Number(nutrient.value);
  const totalDV = rdv[nutrient.name].total;
  const percentDV = itemAmount / totalDV;
  return percentDV < 0.005 ? undefined : {nutrient: nutrient.name, percentDV: percentDV}
}

function searchForFood (searchTerm, maxResults, apiKey) {
  return fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchTerm}&max=${maxResults}&offset=0&api_key=${apiKey}`)
    .then(res => res.json());
}

function buildArray (foodReport) {
  const nutrients = foodReport.report.food.nutrients;
  return nutrients.map(nutrient => calculatePercentDV(nutrient)).filter(obj => obj !== undefined);
}

//todo: graph of amino acid composition (toggle between macros, vits/mins, etc.)
