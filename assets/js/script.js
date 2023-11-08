// Affiche un message dans la console lorsque le script est chargé
console.log("Script chargé !")
// Fonction pour remplir les détails de l'adresse
function fillAddressDetails(address, type) {
  let rueInput, villeInput, codePostalInput;
// Vérifie le type d'adresse (facturation ou livraison)
  if (type === "facturation") {
      rueInput = document.getElementById("rueFacturation");
      villeInput = document.getElementById("villeFacturation");
      codePostalInput = document.getElementById("codePostalFacturation");
  } else if (type === "livraison") {
      rueInput = document.getElementById("rueLivraison");
      villeInput = document.getElementById("villeLivraison");
      codePostalInput = document.getElementById("codePostalLivraison");
  }
// Remplit les champs de rue, ville et code postal avec les données de l'adresse
  rueInput.value = address.properties.name;
  villeInput.value = address.properties.city;
  codePostalInput.value = address.properties.postcode;
}
// Événement exécuté lorsque le contenu de l'élément input de rueFacturation ou rueLivraison change
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("rueFacturation").addEventListener("input", function(event) {
      autocompleteAdresse(event, "facturation");
  });
  document.getElementById("rueLivraison").addEventListener("input", function(event) {
      autocompleteAdresse(event, "livraison");
  });
});
// Fonction pour l'autocomplétion de l'adresse
function autocompleteAdresse(event, type) {
  let inputValue = event.target.value;
  let suggestionsContainer;
   // Détermine le conteneur de suggestions en fonction du type (facturation ou livraison)
   if (type === "facturation") {
    suggestionsContainer = document.getElementById("suggestions_facturation");
  } else if (type === "livraison") {
    suggestionsContainer = document.getElementById("suggestions_livraison");
  }
  suggestionsContainer.innerHTML = "";
// console.log(suggestionsContainer)
  if (inputValue) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${inputValue}`)
          .then(response => response.json())
          .then(data => {
              data.features.forEach(element => {
                  let suggestion = document.createElement('div');
                  suggestion.classList.add('suggestion');
                  suggestion.textContent = element.properties.label;
                  suggestion.addEventListener('click', function() {
                      event.target.value = element.properties.label;
                      suggestionsContainer.innerHTML = "";
                      fillAddressDetails(element, type); 
                  });
                  suggestionsContainer.appendChild(suggestion);
              });
          })
          .catch(error => console.error('Erreur:', error));
  }
}