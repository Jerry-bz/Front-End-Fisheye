import getPhotographers from "../factories/data.js";
import photographerFactory from "../factories/factoryPhotographers.js";
import mediaFactory from "../factories/factoryMedias.js";
import lightBoxDOM, { lightBox }  from "../utils/lightbox.js";


// Page Photographer

//Fonction pour récuperer l'id du photographe
function getPhotographerId() {
  return new URL(window.location).searchParams.get("id");
}

const photographerIdURL = getPhotographerId();

// Data des medias
 const rawMedia = await getPhotographers().then((data) =>
  data.media.filter((media) => {
    return media.photographerId == photographerIdURL;
  })
);

// Data des photographes 
const photographerone = await getPhotographers().then(
  (data) =>
    data.photographers.filter((photographer) => {
      return photographerIdURL == photographer.id;
    })[0]
);


// HTML Navigation

function navigationMedia() {
  let mainButton = document.querySelector("#main-button");
  let navDiv = document.querySelector(".div-nav");
  let oneButton = document.querySelector(".button1");
  let twoButton = document.querySelector(".button2");
  let threeButton = document.querySelector(".button3");

  mainButton.addEventListener('click', () => {
    navDiv.style.display = "block";
  })

  oneButton.addEventListener('click', () => {
    navDiv.style.display = "none";
    mainButton.innerHTML = `Popularité<i class="fas fa-angle-down fa-lg"></i>`;
    mainButton.value = "Popularité";
  })

  twoButton.addEventListener('click', () => {
    navDiv.style.display = "none";
    mainButton.innerHTML = `Date<i class="fas fa-angle-down fa-lg"></i>`;
    mainButton.value = "Date";
  })

  threeButton.addEventListener('click', () => {
    navDiv.style.display = "none";
    mainButton.innerHTML = `Titre<i class="fas fa-angle-down fa-lg"></i>`;
    mainButton.value = "Titre";
  })

};

navigationMedia();


function sortMedias(media) {
  const buttons = document.querySelectorAll('.button1,.button2,.button3');
  let mediaSorted = [];
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (e) => {
      const buttonValue = e.target.value;
      mediaSorted = sortArray(buttonValue, media);
      console.log(mediaSorted);
      console.log(buttonValue);
      displayMedias(mediaSorted);
    });
  }
}


function sortArray(value, medias) {
  let mediaSorted = [];
  if (value == "Popularité") {
    mediaSorted = medias.sort((a, b) => { return b.likes - a.likes }), 'popularité';
  }

  else if (value == "Date") {
    mediaSorted = medias.sort((a, b) => { return a.date.localeCompare(b.date) }, 'date');
  }

  else if (value == "Titre") {
    mediaSorted = medias.sort((a, b) => { return a.title.localeCompare(b.title) }, 'titre');
  }

  console.log(mediaSorted);
  return mediaSorted;
}


function likeMedia(index) {
  let media = rawMedia[index];
  console.log(media);
  media.likes += 1;
  let allLikesP = document.getElementsByClassName("likes");
  let likesP = allLikesP[index];
  likesP.textContent = media.likes;
  updateTotalLikes();
}

function dislikeMedia(index) {
  let media = rawMedia[index];
  console.log(media);
  media.likes -= 1;
  let allLikesP = document.getElementsByClassName("likes");
  let likesP = allLikesP[index];
  likesP.textContent = media.likes;
  updateTotalLikes();
}

function updateTotalLikes() {
  const price = `${photographerone.price}€ / jour`;
  const likes = rawMedia.reduce((acc, el) => acc + el.likes, 0);
  const infoPhotographerFooter = document.getElementById("info-like-price");
  infoPhotographerFooter.innerHTML = `
  <div>${likes}
      <span class="fas fa-heart"></span>
  </div>
  <div>${price}</div>
  `;
}

updateTotalLikes();

//Fonction qui affichent l'entête de la page photographe, la navigation médias et le formulaire
async function displayPhotographers(photographersArray) {
  const photographHeader = document.querySelector(".photograph-header");
  const photographModal = document.querySelector("#contact_modal");
  photographersArray.forEach((photographer) => {
    if (photographer.id == photographerIdURL) {
      // En-tête photographe
      const photographerModelId = photographerFactory(photographer);
      const UserProfilDOM = photographerModelId.getUserProfilDOM();
      photographHeader.appendChild(UserProfilDOM);
      // Formulaire
      const userModalDom = photographerModelId.getUserModalDOM();
      photographModal.appendChild(userModalDom);
      focusForm();  
    }
  });
}

// Fonction qui affichent les médias
async function displayMedias(mediasArray) {
  const photographMedias = document.querySelector(".medias");
  photographMedias.innerHTML = "";
  let index = 0;
  lightBoxDOM();
  mediasArray.forEach((media) => {
    if (photographerIdURL == media.photographerId) {
      const galeryMedias = mediaFactory(media);
      const mediaDOM = galeryMedias.getUserMediaDOM();
      mediaDOM.setAttribute("data-index", index);
      console.log(index);
      mediaDOM.addEventListener("click", (event) => {
        event.preventDefault();
        let i = event.currentTarget.getAttribute("data-index");
        if (event.target.nodeName != "SPAN") {
          console.log("lightbox element:" + i);
          console.log(rawMedia[i].image);
        }
        // Click on heart
        else if (event.target.nodeName == "SPAN") {
          let span = event.target.getAttribute("class");
          console.log(span);
          if (span === "far fa-heart") {
            likeMedia(i);
            event.target.setAttribute("class", "fas fa-heart");
          } else {
            dislikeMedia(i);
            event.target.setAttribute("class", "far fa-heart");
          }
        }
      });
      photographMedias.appendChild(mediaDOM);
      index++;
    }
  });
  lightBox();
}

async function initId() {
  // Récupère les données des photographes et des médias
  const { photographers, media } = await getPhotographers();
  displayPhotographers(photographers);
  displayMedias(media);
  sortMedias(media);
}

initId();
