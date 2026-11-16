/*
 * Formulaire de contact : code fourni par le formateur (EAFC Colfontaine, Web : principes de base).
 * Le formulaire prépare un courriel et ouvre la messagerie du visiteur, qui confirme l'envoi.
 * Seule modification : l'adresse du destinataire (adresse de l'entreprise).
 */
const formulaire =
   document.querySelector("#formulaire-contact");

formulaire.addEventListener("submit", function (event) {
   event.preventDefault();

   const nom = document.querySelector("#nom").value;
   const email = document.querySelector("#email").value;
   const message = document.querySelector("#message").value;

   const sujet = encodeURIComponent("Contact depuis le site");
   const contenu = encodeURIComponent(
      `Nom : ${nom}\nEmail : ${email}\n\n${message}`
   );

   window.location.href =
      `mailto:xtlefebvre@hotmail.com?subject=${sujet}` +
      `&body=${contenu}`;
});
