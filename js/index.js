// Set API endpoint
// const parkeerGaragesEndpoint    = `https://npropendata.rdw.nl/parkingdata/v2/`;
const parkeerGaragesEndpoint    = 'https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json';

// Perform API call
getData(parkeerGaragesEndpoint).then(RDWData => {

     console.log("MY RDW DATA: ", RDWData);
     // console.log("MY RDW DATA: ", RDWData[0]);
    // console.log("THIS IS IT: ", RDWData[0].parkingFacilityInformation.name);

    // console.log('City: ', RDWData[0].parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
    const listCities = getCities(RDWData);
    console.log('N: ', listCities);

});

// Get the data from the API endpoint
async function getData(apiEndpoint) {

    // Perform a call to the API, this will be paused until completion
    const response = await fetch(apiEndpoint);
    console.log("Response: ", response);

    // Wait for the JSON response
    const data = await response.json();

    return data;
}

function getCities(data) {

    const listCities = data.map( (value, index) => {

        if ((typeof value.parkingFacilityInformation.accessPoints[0] == 'undefined') || (typeof value.parkingFacilityInformation.accessPoints[0].accessPointAddress == 'undefined') || (value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city.length === 0)){
            return null;
        }
        // console.log("alle data hier nog: " + index + " - " + value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
        // console.log("TYPE: " + typeof value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
        // return value.parkingFacilityInformation.accessPoints[0].accessPointAddress;
        return value.parkingFacilityInformation;
    });

    return listCities;
}


