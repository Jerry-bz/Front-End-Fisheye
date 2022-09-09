// Création de la lightbox

export function lightBoxDOM() {
    // HTML lightbox
    const lightboxSection = document.querySelector('#lightbox');
    const closeLightbox = document.createElement('button');
    closeLightbox.setAttribute('aria-label', 'Close dialog');
    closeLightbox.classList.add('close__lightbox');
    const prevLightbox = document.createElement('button');
    prevLightbox.setAttribute('aria-label', 'Previous image');
    prevLightbox.setAttribute('class', 'fas fa-chevron-left fa-2x');
    prevLightbox.classList.add('prev__lightbox');
    const nextLightbox = document.createElement('button');
    nextLightbox.setAttribute('aria-label', 'Next image');
    nextLightbox.setAttribute('class', 'fas fa-chevron-right fa-2x');
    nextLightbox.classList.add('next__lightbox');
    const containerLightbox = document.createElement('div');
    containerLightbox.classList.add('container__lightbox');
    const link = document.createElement('a');
    link.classList.add('link');

    lightboxSection.appendChild(closeLightbox);
    lightboxSection.appendChild(prevLightbox);
    lightboxSection.appendChild(nextLightbox);
    lightboxSection.appendChild(containerLightbox);
    containerLightbox.appendChild(link);

    // Fermeture lightBox
    closeLightbox.addEventListener('click', close);

    return lightboxSection;
};

function close() {
    document.querySelector('#lightbox').style.display = "none";
};


// Fonction qui affiche la lightBox
export function lightBox() {
    const srcMedias = document.querySelectorAll('.src-media');
    const lightboxSection = document.querySelector('#lightbox');
    const link = document.querySelector('.link');
    // AddEventListener sur chaque média
    srcMedias.forEach(media => {
        media.addEventListener('click', () => {
            if (media.nodeName == "IMG") {
                const imgLightbox = document.createElement('img');
                imgLightbox.classList.add('media__lightbox');
                imgLightbox.setAttribute('src', media.src);
                const title = document.createElement('h2');
                title.classList.add('title__lightbox');
                title.textContent = `${media.alt}`;
                link.innerHTML = "";
                link.appendChild(imgLightbox);
                link.appendChild(title);

            } else if (media.nodeName == "VIDEO") {
                console.log(media.alt);
                const videoLightbox = document.createElement('video');
                videoLightbox.classList.add('media__lightbox');
                videoLightbox.setAttribute('src', media.src);
                videoLightbox.setAttribute('controls', 'true');
                videoLightbox.setAttribute('type', "video/mp4")
                const title = document.createElement('h2');
                title.classList.add('title__lightbox');
                title.textContent = `${media.alt}`;
                link.innerHTML = "";
                link.appendChild(videoLightbox);
                link.appendChild(title);
            }
            lightboxSection.style.display = "block";
        })
    })
    focusLightbox();
    keydownLightbox();
};


// Fonction qui affiche l'image suivante
function next() {
    const srcMedias = document.querySelectorAll('.src-media');
    let media = document.querySelector('.media__lightbox');
    const link = document.querySelector('.link');
    const title = document.createElement('h2');
    title.classList.add('title__lightbox');
    const arrayMedias = Array.from(srcMedias);
    const compare = ((element) => element.src == media.src);
    let index = arrayMedias.findIndex(compare);
    console.log(index, 'indexElement');
    if (index == srcMedias.length - 1) {
        index = -1;
    }
    console.log(arrayMedias[index + 1].src);
    media.setAttribute('src', arrayMedias[index + 1].src);
    media.setAttribute('alt', arrayMedias[index + 1].alt);
    if (media.src.includes('.mp4')) {
        media = document.createElement('video');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index + 1].src);
        media.setAttribute('controls', 'true');
        media.setAttribute('type', 'video/mp4');
        link.innerHTML = "";
        link.appendChild(media);
        link.appendChild(title);
        title.textContent = `${arrayMedias[index + 1].alt}`
    } else if (media.src.includes('.jpg')) {
        media = document.createElement('img');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index + 1].src);
        link.innerHTML = "";
        link.appendChild(media);
        link.appendChild(title);
        title.textContent = `${arrayMedias[index + 1].alt}`
    };
};


// Fonction qui affiche l'image précedente
function prev() {
    const srcMedias = document.querySelectorAll('.src-media');
    let media = document.querySelector('.media__lightbox');
    const link = document.querySelector('.link');
    const title = document.createElement('h2');
    title.classList.add('title__lightbox');
    const arrayMedias = Array.from(srcMedias);
    const compare = ((element) => element.src == media.src);
    let index = arrayMedias.findIndex(compare);
    console.log(index, 'indexElement');
    if (index == 0) {
        index = srcMedias.length;
    }
    console.log(arrayMedias[index - 1].src);
    media.setAttribute('src', arrayMedias[index - 1].src);
    media.setAttribute('alt', arrayMedias[index - 1].alt);
    if (media.src.includes('.mp4')) {
        media = document.createElement('video');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index - 1].src);
        media.setAttribute('controls', 'true');
        media.setAttribute('type', 'video/mp4');
        link.innerHTML = "";
        link.appendChild(media);
        link.appendChild(title);
        title.textContent = `${arrayMedias[index - 1].alt}`
    } else if (media.src.includes('.jpg')) {
        media = document.createElement('img');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index - 1].src);
        link.innerHTML = "";
        link.appendChild(media);
        link.appendChild(title);
        title.textContent = `${arrayMedias[index - 1].alt}`
    };
};


// Focus lightbox
export function focusLightbox() {
    const medias = document.querySelectorAll('.src-media');
    const closeLightbox = document.querySelector('.close__lightbox');
    for (let media of medias) {
        media.addEventListener('click', () => {
            closeLightbox.focus();
        })
    }
};


// Intéractivité clavier avec lightbox
function keydownLightbox() {
    const lightboxSection = document.querySelector('#lightbox');
    const prevLightbox = document.querySelector('.prev__lightbox');
    const nextLightbox = document.querySelector('.next__lightbox');

    // Touche clavier droite ou gauche
    lightboxSection.addEventListener('keydown', (e) => {
        if (e.key == "ArrowRight") {
            next();
        } else if (e.key == "ArrowLeft") {
            prev();
        } else if (e.key == "Escape") {
            close();
        }
    });

    // Clic souris sur bouton droit ou gauche
    nextLightbox.addEventListener('click', next);
    prevLightbox.addEventListener('click', prev);
};

