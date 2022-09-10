// HTML Lightbox

export function lightBoxDOM() {
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
    link.classList.add('link__lightbox');

    lightboxSection.appendChild(closeLightbox);
    lightboxSection.appendChild(prevLightbox);
    lightboxSection.appendChild(nextLightbox);
    lightboxSection.appendChild(containerLightbox);
    containerLightbox.appendChild(link);

    closeLightbox.addEventListener('click', close);

    return lightboxSection;
};

// Fermeture Lightbox
function close() {
    document.querySelector('#lightbox').style.display = "none";
};


 // Fonction qui affiche la lightBox
 export function lightBox() {
    const linkMedias = document.querySelectorAll('.link__media');
    const linkLightbox = document.querySelector('.link__lightbox');
    const lightboxSection = document.querySelector('#lightbox');
    const closeLightbox = document.querySelector('.close__lightbox');
    // AddEventListener sur chaque lien média
    linkMedias.forEach(linkMedia => {
        linkMedia.addEventListener('click', () => {       
            if (linkMedia.childNodes[0].nodeName == "IMG") {        
                console.log(linkMedia.childNodes[0]);
                const imgLightbox = document.createElement('img');
                imgLightbox.classList.add('media__lightbox');
                imgLightbox.setAttribute('src', linkMedia.childNodes[0].src);
                imgLightbox.setAttribute('alt', linkMedia.childNodes[0].alt);
                const title = document.createElement('h2');
                title.classList.add('title__lightbox');
                title.textContent = `${linkMedia.childNodes[0].alt}`;
                linkLightbox.innerHTML = "";
                linkLightbox.appendChild(imgLightbox);
                linkLightbox.appendChild(title);

            } else if (linkMedia.childNodes[0].nodeName == "VIDEO") {
                const videoLightbox = document.createElement('video');
                videoLightbox.classList.add('media__lightbox');
                videoLightbox.setAttribute('src', linkMedia.childNodes[0].src);
                videoLightbox.setAttribute('title', linkMedia.childNodes[0].title);
                videoLightbox.setAttribute('controls', 'true');
                videoLightbox.setAttribute('type', "video/mp4")
                const title = document.createElement('h2');
                title.classList.add('title__lightbox');
                title.textContent = `${linkMedia.childNodes[0].title}`;
                linkLightbox.innerHTML = "";
                linkLightbox.appendChild(videoLightbox);
                linkLightbox.appendChild(title);
            }

            // Affichage Lightbox
            lightboxSection.style.display = "block";
            // Focus sur la croix
            closeLightbox.focus();
        })
    })
    // Touches clavier Lightbox
    keydownLightbox();
}; 


// Fonction qui affiche l'image suivante
function next() {
    const srcMedias = document.querySelectorAll('.src-media');
    let media = document.querySelector('.media__lightbox');
    const linkLightbox = document.querySelector('.link__lightbox');
    const title = document.createElement('h2');
    title.classList.add('title__lightbox');
    const arrayMedias = Array.from(srcMedias);
    const compare = ((element) => element.src == media.src);
    let index = arrayMedias.findIndex(compare);
    console.log(index, 'indexElement');
    if (index == srcMedias.length - 1) {
        index = -1;
    }
    media.setAttribute('src', arrayMedias[index + 1].src);
    media.setAttribute('alt', arrayMedias[index + 1].alt);
    if (media.src.includes('.mp4')) {
        media = document.createElement('video');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index + 1].src);
        media.setAttribute('title', arrayMedias[index + 1].title)
        media.setAttribute('controls', 'true');
        media.setAttribute('type', 'video/mp4');
        linkLightbox.innerHTML = "";
        linkLightbox.appendChild(media);
        linkLightbox.appendChild(title);
        title.textContent = `${arrayMedias[index + 1].title}`
    } else if (media.src.includes('.jpg')) {
        media = document.createElement('img');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index + 1].src);
        media.setAttribute('alt', arrayMedias[index + 1].alt);
        linkLightbox.innerHTML = "";
        linkLightbox.appendChild(media);
        linkLightbox.appendChild(title);
        title.textContent = `${arrayMedias[index + 1].alt}`;
    };
};


// Fonction qui affiche l'image précedente
function prev() {
    const srcMedias = document.querySelectorAll('.src-media');
    let media = document.querySelector('.media__lightbox');
    const linkLightbox = document.querySelector('.link__lightbox');
    const title = document.createElement('h2');
    title.classList.add('title__lightbox');
    const arrayMedias = Array.from(srcMedias);
    const compare = ((element) => element.src == media.src);
    let index = arrayMedias.findIndex(compare);
    if (index == 0) {
        index = srcMedias.length;
    }
    media.setAttribute('src', arrayMedias[index - 1].src);
    media.setAttribute('alt', arrayMedias[index - 1].alt);
    if (media.src.includes('.mp4')) {
        media = document.createElement('video');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index - 1].src);
        media.setAttribute('title', arrayMedias[index - 1].title);
        media.setAttribute('controls', 'true');
        media.setAttribute('type', 'video/mp4');
        linkLightbox.innerHTML = "";
        linkLightbox.appendChild(media);
        linkLightbox.appendChild(title);
        title.textContent = `${arrayMedias[index - 1].title}`
    } else if (media.src.includes('.jpg')) {
        media = document.createElement('img');
        media.classList.add('media__lightbox');
        media.setAttribute('src', arrayMedias[index - 1].src);
        media.setAttribute('alt', arrayMedias[index - 1].alt);
        linkLightbox.innerHTML = "";
        linkLightbox.appendChild(media);
        linkLightbox.appendChild(title);
        title.textContent = `${arrayMedias[index - 1].alt}`
    };
};



// Intéractivité clavier avec lightbox
function keydownLightbox() {
    const lightboxSection = document.querySelector('#lightbox');
    const closeLightbox = document.querySelector('.close__lightbox');
    const prevLightbox = document.querySelector('.prev__lightbox');
    const nextLightbox = document.querySelector('.next__lightbox');

    // Touche clavier droite ou gauche
    lightboxSection.addEventListener('keydown', (e) => {
        // Si dernier element focusable alors focus sur la croix
        if (document.activeElement == nextLightbox) {
            closeLightbox.focus();
            e.preventDefault();
        }
        if (e.key == "ArrowRight") { // Si touche droite, image suivante
            next();
        } else if (e.key == "ArrowLeft") { // Si touche gauche, image précedente
            prev();
        } else if (e.key == "Escape") { // Si echap, ferme la lightbox
            close();
        }
    });

    // Clic souris sur bouton droit ou gauche
    nextLightbox.addEventListener('click', next);
    prevLightbox.addEventListener('click', prev);
};

