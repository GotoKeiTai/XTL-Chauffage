/*
 * Portfolio : ouvre les photos en grand format dans une fenêtre (élément <dialog>).
 * - Fermeture : bouton, touche Échap ou clic en dehors de la photo.
 * - Navigation : boutons ou flèches gauche/droite du clavier.
 * Sans JavaScript, chaque photo reste un lien vers l'image en grand format.
 */
(function () {
    'use strict';

    var liens = Array.prototype.slice.call(document.querySelectorAll('.realisations-lien'));
    if (!liens.length || typeof HTMLDialogElement === 'undefined') { return; }

    var boite = document.createElement('dialog');
    boite.className = 'visionneuse';
    boite.setAttribute('aria-label', 'Photo agrandie');
    boite.innerHTML =
        '<button class="visionneuse-bouton visionneuse-fermer" type="button" aria-label="Fermer">&times;</button>' +
        '<button class="visionneuse-bouton visionneuse-precedent" type="button" aria-label="Photo précédente">&#8249;</button>' +
        '<figure class="visionneuse-figure"><img class="visionneuse-image" alt="">' +
        '<figcaption class="visionneuse-legende"></figcaption></figure>' +
        '<button class="visionneuse-bouton visionneuse-suivant" type="button" aria-label="Photo suivante">&#8250;</button>';

    var image = boite.querySelector('.visionneuse-image');
    var legende = boite.querySelector('.visionneuse-legende');
    var index = 0;

    function afficher(position) {
        index = (position + liens.length) % liens.length;
        var lien = liens[index];
        var photo = lien.querySelector('img');
        var texte = photo ? photo.alt : '';
        image.src = lien.href;
        image.alt = texte;
        legende.textContent = texte + ' (' + (index + 1) + ' / ' + liens.length + ')';
    }

    liens.forEach(function (lien, position) {
        lien.addEventListener('click', function (evenement) {
            // Laisse le navigateur gérer les clics spéciaux (nouvel onglet, etc.)
            if (evenement.metaKey || evenement.ctrlKey || evenement.shiftKey) { return; }
            evenement.preventDefault();
            afficher(position);
            boite.showModal();
        });
    });

    boite.querySelector('.visionneuse-fermer').addEventListener('click', function () { boite.close(); });
    boite.querySelector('.visionneuse-precedent').addEventListener('click', function () { afficher(index - 1); });
    boite.querySelector('.visionneuse-suivant').addEventListener('click', function () { afficher(index + 1); });

    // Un clic sur le fond (en dehors de la photo et des boutons) ferme la fenêtre
    boite.addEventListener('click', function (evenement) {
        if (evenement.target === boite) { boite.close(); }
    });

    boite.addEventListener('keydown', function (evenement) {
        if (evenement.key === 'ArrowLeft') { afficher(index - 1); }
        if (evenement.key === 'ArrowRight') { afficher(index + 1); }
    });

    document.body.appendChild(boite);
}());
