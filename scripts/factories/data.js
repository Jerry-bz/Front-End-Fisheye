// Récupération des données du fichier photographers.JSON

export async function getPhotographers() {
  let response = await fetch("data/photographers.json");
  let data = await response.json();
  return data;
}

//Fonction pour récuperer l'id du photographe
function getPhotographerId() {
  return new URL(window.location).searchParams.get("id");
};

export const photographerIdURL = getPhotographerId();


// Retourne les données du photographer de la page
export const photographerone = await getPhotographers().then(
  (data) =>
    data.photographers.filter((photographer) => {
      return photographerIdURL == photographer.id;
    })[0]
);


// Retourne les médias
export const rawMedia = await getPhotographers().then((data) =>
  data.media.filter((media) => {
    return media.photographerId == photographerIdURL;
  })
);

