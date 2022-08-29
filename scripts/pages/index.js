import getPhotographers from "../factories/data.js";
import photographerFactory from "../factories/factoryPhotographers.js";

// Page Index

// Fonction qui affiche les données de la page d'acceuil
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les donéées des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

