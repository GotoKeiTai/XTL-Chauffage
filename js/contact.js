/*
 * Envoi du formulaire de devis sans rechargement de page.
 * - Le formulaire reste fonctionnel sans JavaScript (envoi classique vers l'action).
 * - Le service d'envoi (Formspree) est défini dans l'attribut "action" du formulaire.
 */
(function () {
    'use strict';

    var formulaire = document.querySelector('[data-formulaire-devis]');
    if (!formulaire) { return; }

    var message = document.getElementById('contact-message');
    var bouton = formulaire.querySelector('.contact-submit');
    var texteBouton = bouton.value;

    function afficher(texte, type) {
        message.textContent = texte;
        message.className = 'contact-message contact-message--' + type;
    }

    formulaire.addEventListener('submit', function (evenement) {
        evenement.preventDefault();

        // Anti-spam : un robot remplit le champ caché, un humain non.
        if (formulaire.elements._gotcha && formulaire.elements._gotcha.value) { return; }

        if (!formulaire.checkValidity()) {
            formulaire.reportValidity();
            return;
        }

        if (formulaire.action.indexOf('REMPLACER_PAR') !== -1) {
            afficher("Le formulaire n'est pas encore relié à la boîte de réception de l'entreprise. Merci d'appeler le 065 87 50 66.", 'erreur');
            return;
        }

        bouton.disabled = true;
        bouton.value = 'Envoi en cours…';
        afficher('', 'info');

        fetch(formulaire.action, {
            method: 'POST',
            body: new FormData(formulaire),
            headers: { 'Accept': 'application/json' }
        }).then(function (reponse) {
            if (!reponse.ok) { throw new Error('HTTP ' + reponse.status); }
            formulaire.reset();
            afficher('Merci ! Votre demande a bien été envoyée. Nous vous répondons rapidement.', 'ok');
        }).catch(function () {
            afficher("L'envoi a échoué. Réessayez ou appelez-nous au 065 87 50 66.", 'erreur');
        }).finally(function () {
            bouton.disabled = false;
            bouton.value = texteBouton;
        });
    });
}());
