console.log('JS is alive!');

// Set API endpoint
const parkeerGaragesEndpoint    = `https://opendata.rdw.nl/resource/t5pc-eb34.json`;

// Perform API call
getData(parkeerGaragesEndpoint);

// Get the data from the API endpoint
async function getData(apiEndpoint) {

    // Perform a call to the API, this will be paused until completion
    const response      = await fetch(apiEndpoint);

    // Wait for the JSON response
    const data          = await response.json();

    console.log(data);

}