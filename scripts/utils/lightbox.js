// Création de la lightbox

export default function lightBoxDOM() {
    // HTML lightbox
    const lightboxSection = document.querySelector('#lightbox');
    const closeLightbox = document.createElement('button');
    closeLightbox.setAttribute('aria-label', 'Close dialog');
    closeLightbox.classList.add('close__lightbox');
    const prevLightbox = document.createElement('button');
    prevLightbox.setAttribute('aria-label', 'Previous image');
    prevLightbox.setAttribute('class','fas fa-chevron-left fa-2x');
    prevLightbox.classList.add('prev__lightbox');
    const nextLightbox = document.createElement('button');
    nextLightbox.setAttribute('aria-label','Next image');
    nextLightbox.setAttribute('class','fas fa-chevron-right fa-2x');
    nextLightbox.classList.add('next__lightbox');
    const containerLightbox = document.createElement('div');
    containerLightbox.classList.add('container__lightbox');
    const link = document.createElement('a');
    link.classList.add('link');
    const imgLightbox = document.createElement('img');
    imgLightbox.classList.add('img__lightbox');


    lightboxSection.appendChild(closeLightbox);
    lightboxSection.appendChild(prevLightbox);
    lightboxSection.appendChild(nextLightbox);
    lightboxSection.appendChild(containerLightbox);
    containerLightbox.appendChild(link);
    link.appendChild(imgLightbox);

    // Fermeture lightBox
    closeLightbox.addEventListener('click', close);

    return lightboxSection;
};

function close() {
    document.querySelector('#lightbox').style.display= "none";
};


export function lightBox() {
    // Liste des médias
    const srcMedias = document.querySelectorAll('.src-media');
    console.log(srcMedias);
    ligthBoxNext();
    ligthBoxPrev();
    // AddEventListener sur chaque média
    srcMedias.forEach(media => {
        media.addEventListener('click', () => {
            const lightboxSection = document.querySelector('#lightbox');
            lightboxSection.style.display ="block";
    // src lightbox = src media 
            const srcLightbox = document.querySelector('.img__lightbox');
            srcLightbox.src = media.src;
            srcLightbox.setAttribute('alt', media.alt );
        })
    })

}

function ligthBoxNext() {
    const srcMedias = document.querySelectorAll('.src-media');
    const nextLightbox = document.querySelector('.next__lightbox');
    const srcLightbox = document.querySelector('.img__lightbox');
    nextLightbox.addEventListener('click', () => {
        console.log(srcLightbox.src);
        // Node list = Array;
       const arrayMedias = Array.from(srcMedias);
       console.log(arrayMedias);
        const compare = ((element) => element.src == srcLightbox.src);
        let index = arrayMedias.findIndex(compare);
        console.log(index,'indexElement');
         if (index == srcMedias.length -1) {
             index = -1;
        }
        console.log(arrayMedias[index+1].src);
        srcLightbox.setAttribute('src',  arrayMedias[index+1].src );
        srcLightbox.setAttribute('alt', arrayMedias[index+1].alt );
     })

}


function ligthBoxPrev() {
    const srcMedias = document.querySelectorAll('.src-media');
    const prevLightbox = document.querySelector('.prev__lightbox');
    const srcLightbox = document.querySelector('.img__lightbox');
    prevLightbox.addEventListener('click', () => {
        const arrayMedias = Array.from(srcMedias);
       console.log(arrayMedias);
       const compare = ((element) => element.src == srcLightbox.src);
        let index = arrayMedias.findIndex(compare);
        console.log(index,'indexElement');
        if (index == 0 ) {
            index = srcMedias.length ;
            console.log(index);
        }

        srcLightbox.setAttribute('src',  arrayMedias[index-1].src);
        srcLightbox.setAttribute('alt', arrayMedias[index-1].alt );
    })
}


