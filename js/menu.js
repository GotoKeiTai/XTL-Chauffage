/*
 * Menu mobile : se referme après un clic sur un lien (utile pour les liens vers une section
 * de la même page), avec la touche Échap ou en touchant en dehors du menu.
 * Sans JavaScript, le menu reste utilisable (ouverture et fermeture avec le bouton « Menu »).
 */
(function () {
    'use strict';

    var menu = document.querySelector('.header-burger');
    if (!menu) { return; }

    function fermer() {
        menu.removeAttribute('open');
    }

    menu.addEventListener('click', function (evenement) {
        if (evenement.target.closest('a')) { fermer(); }
    });

    document.addEventListener('keydown', function (evenement) {
        if (evenement.key === 'Escape' && menu.hasAttribute('open')) {
            fermer();
            menu.querySelector('summary').focus();
        }
    });

    document.addEventListener('click', function (evenement) {
        if (menu.hasAttribute('open') && !menu.contains(evenement.target)) { fermer(); }
    });
}());
