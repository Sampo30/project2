const API_KEY = "d271a80cf28ddc34f134d0ab4f5e9fea";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

function fetchArtists(name) {
  const params = {
    method: "artist.search",
    artist: name,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.results.artistmatches.artist);
}

function fetchAlbums(artistId) {
  const params = {
    method: "artist.gettopalbums",
    artist: artistId,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.topalbums.album);
}

const artistList = document.getElementById("artist-list");

function displayArtists(artists) {
  artistList.innerHTML = "";

  artists.forEach(artist => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("data-artist-id", artist.mbid);
    a.textContent = artist.name;

    li.appendChild(a);
    artistList.appendChild(li);
  });
}

artistList.addEventListener("click", event => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const artistId = event.target.getAttribute("data-artist-id");
    fetchAlbums(artistId).then(displayAlbums);
  }
});

const searchForm = document.querySelector("form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  const searchString = searchInput.value;
  fetchArtists(searchString).then(displayArtists);
});

const albumInfo = document.getElementById("album-info");

function displayAlbums(albums) {
  albumInfo.innerHTML = "";

  albums.forEach(album => {
    const h3 = document.createElement("h3");
    h3.textContent = album.name;

    const img = document.createElement("img");
    img.setAttribute("src", album.image[1]["#text"]);

    const p = document.createElement("p");
    p.textContent = album.playcount;

    albumInfo.appendChild(h3);
    albumInfo.appendChild(img);
    albumInfo.appendChild(p);
  });
}

const DEFAULT_ARTIST = "The Beatles";

function init() {
  fetchArtists(DEFAULT_ARTIST).then(displayArtists);
}

init();

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

function fetchArtists(name) {
  showSpinner();

  const params = {
    method: "artist.search",
    artist: name,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      hideSpinner();
      return data.results.artistmatches.artist;
    });
}

function fetchAlbums(artistId) {
  showSpinner();

  const params = {
    method: "artist.gettopalbums",
    artist: artistId,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      hideSpinner();
      return data.topalbums.album;
    });
}


const errorMessage = document.getElementById("error-message");

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

function fetchArtists(name) {
  hideError();
  showSpinner();

  const params = {
    method: "artist.search",
    artist: name,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      hideSpinner();
      return data.results.artistmatches.artist;
    })
    .catch(error => {
      hideSpinner();
      showError(error.message);
    });
}

function fetchAlbums(artistId) {
  hideError();
  showSpinner();

  const params = {
    method: "artist.gettopalbums",
    artist: artistId,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      hideSpinner();
      return data.topalbums.album;
    })
    .catch(error => {
      hideSpinner();
      showError(error.message);
    });
}


const noResults = document.getElementById("no-results");

function showNoResults() {
  noResults.style.display = "block";
}

function hideNoResults() {
  noResults.style.display = "none";
}

function fetchArtists(name) {
  hideError();
  hideNoResults();
  showSpinner();

  const params = {
    method: "artist.search",
    artist: name,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      hideSpinner();

      const artists = data.results.artistmatches.artist;

      if (artists.length === 0) {
        showNoResults();
      } else {
        hideNoResults();
        return artists;
      }
    })
    .catch(error => {
      hideSpinner();
      showError(error.message);
    });
}

function fetchAlbums(artistId) {
  hideError();
  hideNoResults();
  showSpinner();

  const params = {
    method: "artist.gettopalbums",
    artist: artistId,
    api_key: API_KEY,
    format: "json",
    limit: 10
  };

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const url = `${API_URL}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(albums => {
      hideSpinner();

      const albums = data.results.albumInfo.album;

    if (albums.length === 0) {
      showNoResults();
    } else {
      hideNoResults();
      return albums;
    }
  });
}
