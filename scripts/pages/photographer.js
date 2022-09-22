/* eslint-disable eqeqeq */
// Fonctions datas
import getPhotographers, { photographerIdURL, dataPhotographer, dataMedias } from '../factories/data.js';
// Factories functions
import photographerFactory from '../factories/factoryPhotographers.js';
import mediaFactory from '../factories/factoryMedias.js';
// Utils
import { lightBoxDOM, lightBox } from '../utils/lightbox.js';

// Page Photographer

// HTML Navigation Medias des photographes

function navigationMedia () {
  const mainButton = document.querySelector('#main-button')
  const navDiv = document.querySelector('.div-nav')
  const oneButton = document.querySelector('.button1')
  const twoButton = document.querySelector('.button2')
  const threeButton = document.querySelector('.button3')

  mainButton.addEventListener('click', () => {
    navDiv.style.display = 'block'
  })

  oneButton.addEventListener('click', () => {
    navDiv.style.display = 'none'
    mainButton.innerHTML = 'Popularité<i class="fas fa-angle-down fa-lg"></i>'
    mainButton.value = 'Popularité'
  })

  twoButton.addEventListener('click', () => {
    navDiv.style.display = 'none'
    mainButton.innerHTML = 'Date<i class="fas fa-angle-down fa-lg"></i>'
    mainButton.value = 'Date'
  })

  threeButton.addEventListener('click', () => {
    navDiv.style.display = 'none'
    mainButton.innerHTML = 'Titre<i class="fas fa-angle-down fa-lg"></i>'
    mainButton.value = 'Titre'
  })
};

navigationMedia()

// Function qui trie les médias selon la valeur du bouton sélectionné
function sortArray (value, medias) {
  let mediaSorted = []
  if (value === 'Popularité') {
    mediaSorted = medias.sort((a, b) => { return b.likes - a.likes })
  } else if (value === 'Date') {
    mediaSorted = medias.sort((a, b) => { return a.date.localeCompare(b.date) })
  } else if (value === 'Titre') {
    mediaSorted = medias.sort((a, b) => { return a.title.localeCompare(b.title) })
  }

  return mediaSorted
};

function sortMedias (media) {
  // Recupération des boutons de navigation
  const buttons = document.querySelectorAll('.button1,.button2,.button3')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (e) => {
      // récuperation de la valeur du bouton lors du click
      const buttonValue = e.target.value
      // Trie des médias selon la valeur du bouton
      const mediaSorted = sortArray(buttonValue, media)
      displayMedias(mediaSorted)
    })
  }
};

// Incrémentation du nombre de Likes du média
function likeMedia (index) {
  // index media
  const media = dataMedias[index]
  // Tous les éléments likes
  const allLikes = document.getElementsByClassName('likes')
  // Element du dom qui correspond au likes
  const likes = allLikes[index]
  // incrémentation du nombre de likes selon l'index
  media.likes += 1
  // Affichage incrémentation du nombre de likes
  likes.textContent = media.likes
  updateTotalLikes()
};

// Décrémentation du nombre de likes du média
function dislikeMedia (index) {
  // index media
  const media = dataMedias[index]
  // Tous les éléments likes
  const allLikes = document.getElementsByClassName('likes')
  // Element du dom qui correspond au likes
  const likes = allLikes[index]
  // décrémentation du nombre de likes selon l'index
  media.likes -= 1
  // Affichage décrémentation du nombre de likes
  likes.textContent = media.likes
  updateTotalLikes()
};

// Total des likes de tous les medias du photographe
function updateTotalLikes () {
  const price = `${dataPhotographer.price}€ / jour`
  const likes = dataMedias.reduce((acc, el) => acc + el.likes, 0)
  const infoPhotographerFooter = document.getElementById('info-like-price')
  infoPhotographerFooter.innerHTML = `
  <div>${likes}
      <span class="fas fa-heart" aria-label="Total likes photographers"></span>
  </div>
  <div>${price}</div>
  `
};

updateTotalLikes()

// Fonction qui affichent l'entête de la page photographe, la navigation médias et le formulaire
function displayPhotographers (photographersArray) {
  const photographHeader = document.querySelector('.photograph-header')
  const photographModal = document.querySelector('#contact_modal')
  photographersArray.forEach((photographer) => {
    if (photographer.id == photographerIdURL) {
      // En-tête photographe
      const photographerModelId = photographerFactory(photographer)
      const UserProfilDOM = photographerModelId.getUserProfilDOM()
      photographHeader.appendChild(UserProfilDOM)
      // Formulaire
      const userModalDom = photographerModelId.getUserModalDOM()
      photographModal.appendChild(userModalDom)
      // eslint-disable-next-line no-undef
      focusForm()
    }
  })
};

// Fonction qui affichent les médias
function displayMedias (mediasArray) {
  sortMedias(mediasArray)
  const photographMedias = document.querySelector('.medias')
  photographMedias.innerHTML = ''
  let index = 0
  mediasArray.forEach((media) => {
    if (photographerIdURL == media.photographerId) {
      const galeryMedias = mediaFactory(media)
      const mediaDOM = galeryMedias.getUserMediaDOM()
      mediaDOM.setAttribute('data-index', index)

      // Click de la souris sur le coeur
      mediaDOM.addEventListener('click', (event) => {
        event.preventDefault()
        const i = event.currentTarget.getAttribute('data-index')
        if (event.target.nodeName == 'SPAN') {
          const span = event.target.getAttribute('class')
          console.log(span)
          if (span === 'far fa-heart') {
            likeMedia(i)
            event.target.setAttribute('class', 'fas fa-heart')
          } else {
            dislikeMedia(i)
            event.target.setAttribute('class', 'far fa-heart')
          }
        }
      });

      // Pression sur la touche entrée
      mediaDOM.addEventListener('keypress', (event) => {
        event.preventDefault()
        const i = event.currentTarget.getAttribute('data-index')
        // Si touche entrée
        if (event.key == 'Enter') {
          if (event.target.nodeName == 'SPAN') {
            const span = event.target.getAttribute('class')
            if (span === 'far fa-heart') {
              likeMedia(i)
              event.target.setAttribute('class', 'fas fa-heart')
            } else {
              dislikeMedia(i)
              event.target.setAttribute('class', 'far fa-heart')
            }
          }
        }
      })
      photographMedias.appendChild(mediaDOM)
      index++
    }
  })
  lightBoxDOM()
  lightBox()
};

async function initId () {
  // Récupère les données des photographes et des médias
  const { photographers, media } = await getPhotographers()
  // Affichage des données photographes
  displayPhotographers(photographers)
  // Affichage des médias
  displayMedias(media)
  // Affichage médias selon la navigation
  sortMedias(media)
};

initId();
