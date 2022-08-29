export default function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  function getUserCardDOM() {
    // HTML Page d'acceuil
    const article = document.createElement("article");
    const indexPhotographer = `
    <a href="photographer.html?id=${id}" role="link">
        <img src="assets/images/photographers/${portrait}" alt="" role="img" aria-label="${name}"/>
            <h2 class="name">${name}</h2>
    </a>
        <p class="localisation">${city + "/" + country}</p>
        <p class="citation">${tagline}</p>
        <p class="tariff">${price + "€" + "/jour"}</p>
    `;
    article.innerHTML = indexPhotographer;

    return article;
  }

  function getUserProfilDOM() {
    // HTML En-tête page du photographe
    const header = document.createElement("section");
    header.classList.add('section-header');
    const headerPhotographer = `   
    <article class="presentation">
        <h1 class="name">${name}</h1>
        <p class="localisation">${city + "," + country}</p>
        <p class="citation">${tagline}</p>
    </article>
        <button class="contact_button" alt="Contact Me" onclick="displayModal()">Contactez-moi</button>  
        <img src="assets/images/photographers/${portrait}" alt="${name}" role="img" aria-label="${name}"/>
        `;

    header.innerHTML = headerPhotographer;

    return header;
  }

  function getUserModalDOM() {
    // HTML formulaire
    const formDiv = document.createElement("div");
    const form = `
    <div class="modal" role="dialog">
      <form id="contact" action="" method="get">
        <div class="header-form">
          <h2>Contactez-moi<br>${name}</h2>
          <button class="close-modal" aria-label="Close Contact form" onclick="closeModal()"/>
        </div>
          <div class="form__data">
            <label for="firstName">Prénom</label>
            <input type="text" id="firstName" name="firstName" minLength="3" placeholder="Saisir votre prénom" alt="saisir votre prénom" required/>
          </div>
          <div class="form__data">
            <label for="lastName">Nom</label>
            <input type="text" id="lastName" name="lastName" minLength="3" placeholder="Saisir votre nom" alt="saisir votre nom" required/>
          </div>
          <div class="form__data">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" minLength="5" placeholder="Saisir votre e-mail" alt="saisir votre e-mail" required/>
          </div>
          <div class="form__data">
            <label for="message">Votre message</label>
            <textarea style="width:100%; height:16vh" id="message" name="message" rows="5"></textarea>
          </div>
          <button class="submit_button" aria-label="send">Envoyer</button>
      </form>
    </div>
    `;

    formDiv.innerHTML = form;

    return formDiv;
  }

  return { getUserCardDOM, getUserProfilDOM, getUserModalDOM };
}
