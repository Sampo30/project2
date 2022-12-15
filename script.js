// Get the search input and button and clear button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');

// Add an event listener to the clear button
clearButton.addEventListener('click', function() {
    // Get the results div
    const resultsDiv = document.getElementById('results');
    // Clear the inner HTML of the results div
    resultsDiv.innerHTML = '';
})

// Add an event listener to the button to send the request when clicked
searchButton.addEventListener('click', function() {
    // Get the user's search query
    const query = searchInput.value;

    // Create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Set the endpoint and parameters for the request
    const endpoint = 'https://restcountries.com/v2/name/' + query;

    // Open the request
    xhr.open('GET', endpoint);

    // Send the request
    xhr.send();

    // Add an event listener to handle the response
    xhr.addEventListener('load', function() {
        // Parse the response as JSON
        const response = JSON.parse(xhr.response);

        // Get the results div
        const resultsDiv = document.getElementById('results');

        
        // Iterate over the countries in the response
        response.forEach(function(country) {
            // Extract the country information
            const flag = country.flag;
            const population = country.population;
            const language = country.languages[0].name;
            const currency = country.currencies[0].name;
            const capital = country.capital;
            const region = country.region;

            // Create the card container
            const cardDiv = document.createElement('div');

            // Create the flag image and info container
            const flagImg = document.createElement('img');
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');

            // Create the info text
            const populationP = document.createElement('p');
            const languageP = document.createElement('p');
            const currencyP = document.createElement('p');
            const capitalP = document.createElement('p');
            const regionP = document.createElement('p');

            // Set the src attribute for the flag image
            flagImg.src = flag;

            // Set the text content for the info text elements
            populationP.innerHTML = 'Population: ' + population.toLocaleString();
            languageP.innerHTML = 'Language: ' + language;
            currencyP.innerHTML = 'Currency: ' + currency;
            capitalP.innerHTML = 'Capital: ' + capital;
            regionP.innerHTML = 'Region: ' + region;

            // Append the flag image and info text elements to the card
            cardDiv.appendChild(flagImg);
            infoDiv.appendChild(populationP);
            infoDiv.appendChild(languageP);
            infoDiv.appendChild(currencyP);
            infoDiv.appendChild(capitalP);
            infoDiv.appendChild(regionP);
            cardDiv.appendChild(infoDiv);

            // Append the card to the results div
            resultsDiv.appendChild(cardDiv);
        });
    });
});
