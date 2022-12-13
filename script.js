// Create an array of artists
var artists = ["Ashenspire", "Archspire", "King Buffalo", "Devin Townsend", "Opeth", "Disillusion", "Ayreon", "An abstract Illusion", "Tyler Kamen", "Blind Guardian", "Fellowship", "Wilderun"];

// Create a <select> element
var selectElement = document.createElement("select");
selectElement.id = "artist-select";

// Add an <option> element for each artist
for (var i = 0; i < artists.length; i++) {
    var optionElement = document.createElement("option");
    optionElement.innerHTML = artists[i];
    selectElement.appendChild(optionElement);
}

// Append the <select> element to the document
document.body.appendChild(selectElement);