// Récupération des données des photographes
export default async function getPhotographers() {
    let response = await fetch("data/photographers.json");
    let data = await response.json();
    return data;
}

