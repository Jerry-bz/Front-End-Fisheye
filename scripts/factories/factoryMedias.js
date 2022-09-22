// Fonction usine qui récupèrent et affichent les médias
export default function mediaFactory (data) {
  // Récupération des médias
  const { id, photographerId, title, image, video, likes } = data
  let typeMedia = `assets/images/${photographerId}/`
  if (image) {
    typeMedia += image
  } else {
    typeMedia += video
  }

  function getUserMediaDOM () {
    // Fonction qui affiche les données relatives aux médias
    const figureGalery = document.createElement('figure')
    figureGalery.setAttribute('id', 'figure-' + id)
    figureGalery.setAttribute('aria-label', 'carte du média ' + title)
    if (image) {
      const imgMedia = document.createElement('img')
      imgMedia.classList.add('src-media')
      imgMedia.src = typeMedia
      imgMedia.setAttribute('alt', title)
      figureGalery.appendChild(imgMedia)
      /** ************** */
      const a = document.createElement('a')
      a.setAttribute('href', '#')
      a.classList.add('link__media')
      const divMediaInfo = document.createElement('div')
      divMediaInfo.setAttribute('class', 'media-info')
      const h2 = document.createElement('h2')
      h2.textContent = title
      const p = document.createElement('p')
      p.setAttribute('class', 'likes')
      p.textContent = likes
      const i = document.createElement('span')
      i.setAttribute('class', 'far fa-heart')
      i.setAttribute('tabindex', '0')
      i.setAttribute('aria-label', 'likes')
      figureGalery.appendChild(a)
      a.appendChild(imgMedia)
      figureGalery.appendChild(divMediaInfo)
      divMediaInfo.appendChild(h2)
      divMediaInfo.appendChild(p)
      divMediaInfo.appendChild(i)
    } else {
      /** ******************** */
      const a = document.createElement('a')
      a.setAttribute('href', '#')
      a.classList.add('link__media')
      // const article = document.createElement("article");
      const videoMedia = document.createElement('video')
      videoMedia.classList.add('src-media')
      videoMedia.setAttribute('controls', '')
      videoMedia.setAttribute('type', 'video/mp4')
      videoMedia.setAttribute('title', title)
      videoMedia.src = typeMedia

      // videoMedia.setAttribute("autoplay", "true");
      const divMediaInfo = document.createElement('div')
      divMediaInfo.setAttribute('class', 'media-info')
      const h2 = document.createElement('h2')
      h2.textContent = title
      const p = document.createElement('p')
      p.setAttribute('class', 'likes')
      p.textContent = `${likes}`
      const i = document.createElement('span')
      i.setAttribute('class', 'far fa-heart')
      i.setAttribute('tabindex', '0')
      i.setAttribute('aria-label', 'likes')
      figureGalery.appendChild(a)
      a.appendChild(videoMedia)
      figureGalery.appendChild(divMediaInfo)
      divMediaInfo.appendChild(h2)
      divMediaInfo.appendChild(p)
      divMediaInfo.appendChild(i)
    }
    return figureGalery
  }

  return { getUserMediaDOM }
}
