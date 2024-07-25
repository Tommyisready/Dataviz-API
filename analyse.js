async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

async function loadRegionData() {
  const url =
    "https://opendata.caissedesdepots.fr/api/explore/v2.1/catalog/datasets/logements-et-logements-sociaux-dans-les-departements/records?select=annee_publication%2C%20code_departement%2C%20nom_departement%2C%20nom_region%2C%20nombre_de_logements%2C%20taux_de_logements_vacants_en%2C%20parc_social_nombre_de_logements%2C%20parc_social_logements_mis_en_location%2C%20parc_social_taux_de_logements_vacants_en&order_by=nom_region&limit=100&lang=fr&refine=annee_publication%3A%222023%22";
  const json = await fetchData(url);
  if (json) {
    const urlParams = new URLSearchParams(window.location.search);
    const regionName = decodeURIComponent(urlParams.get("region"));

    const regionData = json.results.filter((result) => result.nom_region === regionName);
    displayRegionData(regionData);
  }
}

function displayRegionData(data) {
  const container = document.getElementById("region-data");
  container.innerHTML = JSON.stringify(data, null, 2); // Basic display, customize as needed
}

document.addEventListener("DOMContentLoaded", loadRegionData);
