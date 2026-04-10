/* =========================================================
   🟢 PARTIE 1 : EDITEUR (FORMULAIRE)
   ========================================================= */

let compteurPartie = 0;

/* Ajouter une partie */
function ajouterBlocPartie() {
    compteurPartie++;

    const container = document.getElementById("parties-form");

    if (!container) return;

    const div = document.createElement("div");
    div.className = "bloc-partie";

    div.innerHTML = `
        <label>Titre de la partie</label>
        <input type="text" class="titre-partie" placeholder="1ère Partie">

        <label>Responsable principal</label>
        <input type="text" class="responsable-partie" placeholder="La Présentatrice : Sr Sherly Elisée">

        <label>Activités (1 ligne = a, b, c…)</label>
        <textarea class="activites-partie" rows="5"></textarea>
    `;

    container.appendChild(div);
}

/* Générer + envoyer vers index */
function genererProgramme() {

    const titreProgramme = document.getElementById("programme").value.trim();

    const blocs = document.querySelectorAll(".bloc-partie");

    let parties = [];
    let index = 1;

    blocs.forEach(bloc => {

        const responsable = bloc.querySelector(".responsable-partie").value.trim();
        const activitesTexte = bloc.querySelector(".activites-partie").value.trim();

        if (!responsable || !activitesTexte) return;

        parties.push({
            numero: index,
            responsable: responsable,
            activites: activitesTexte.split("\n")
        });

        index++;
    });

    // 🔥 SESSION STORAGE (disparaît à la fermeture navigateur)
    sessionStorage.setItem("programmeTitre", titreProgramme);
    sessionStorage.setItem("programmeParties", JSON.stringify(parties));

    // 🔁 redirection vers index
    window.location.href = "index.html";
}


/* =========================================================
   🔵 PARTIE 2 : INDEX (AFFICHAGE + PAGINATION)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const titre = sessionStorage.getItem("programmeTitre");
    const parties = JSON.parse(sessionStorage.getItem("programmeParties"));

    // sécurité : si pas page index → STOP
    const test = document.getElementById("programmeAffiche");
    if (!test) return;

    if (!titre || !parties) return;

    // vider page
    const body = document.body;
    body.innerHTML = "";

    let page = createPage();
    body.appendChild(page);

    let container = page.querySelector(".contenu");

    // titre programme
    const titreEl = document.createElement("p");
    titreEl.className = "programme-texte";
    titreEl.textContent = titre;
    container.appendChild(titreEl);

    let index = 1;

    parties.forEach(partie => {

        const bloc = document.createElement("div");
        bloc.className = "partie";

        let html = `
            <div class="partie-titre">${index}ère Partie</div>
            <div class="partie-responsable">${index} – ${partie.responsable}</div>
            <ol class="partie-liste" type="a">
        `;

        partie.activites.forEach(act => {
            html += `<li>${act}</li>`;
        });

        html += `</ol>`;

        bloc.innerHTML = html;

        // pagination simple
        if (container.scrollHeight > 850) {
            page = createPage();
            body.appendChild(page);
            container = page.querySelector(".contenu");
        }

        container.appendChild(bloc);

        index++;
    });
});


/* =========================================================
   🔥 CRÉER UNE PAGE A4 (HEADER + FOOTER)
   ========================================================= */

function createPage() {

    const page = document.createElement("div");
    page.className = "page";

    page.innerHTML = `
        <header class="header-feuille">
            <div class="logo">
                <img src="assets/img/Logo EEG.jpg">
            </div>

            <div class="texte-centre">
                <h1>Église Évangélique de la Grâce</h1>
                <h2>EEG</h2>
            </div>

            <div class="logo">
                <img src="assets/img/Logo EEG.jpg">
            </div>
        </header>

        <main class="contenu"></main>

        <footer class="footer-feuille">
            <p>
                📞 +509 3110-6958 / 4474-2226 / 3608-3610<br>
                ✉️ egliselagrace55@gmail.com<br>
                📍 100, Bizoton 55, Carrefour, Haïti
            </p>
        </footer>
    `;

    return page;
}