// Select the artist buttons and the artist info container
const artistButtons = document.querySelector('#artist-buttons');
const artistInfo = document.querySelector('#artist-info');

// Set the API key for the Last.fm API
const API_KEY = 'd271a80cf28ddc34f134d0ab4f5e9fea';

// Add an event listener to the artist buttons container
artistButtons.addEventListener('click', handleArtistClick);

// Define the handleArtistClick function
function handleArtistClick(event) {
  // Get the artist name from the button text
  const artist = event.target.textContent;

  // Use AJAX to fetch information about the artist from the Last.fm API
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${API_KEY}&format=json`);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
  
      let bioSummary;
      if (typeof data.bio !== 'undefined') {
        bioSummary = data.bio.summary;
      } else {
        bioSummary = 'No bio available for this artist.';
      }
  
      let imageUrl;
      if (typeof data.image !== 'undefined') {
        imageUrl = data.image[3]['#text'];
      } else {
        imageUrl = '';
      }
  
      // Create the HTML for the artist info
      const html = `
        <h2>${data.name}</h2>
        <p>${bioSummary}</p>
        <img src="${imageUrl}" alt="${data.name}">
      `;
  
      // Update the artist info container with the new HTML
      artistInfo.innerHTML = html;
    }
  };  
  
  xhr.send();
}
