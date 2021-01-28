// Set API endpoints
const RDWApiUrl = 'https://npropendata.rdw.nl/parkingdata/v2/';
const proxyUrl  = 'https://cors-anywhere.herokuapp.com/';
const allParkingIntroDataLocal = NPRORDWAllData[0].ParkingFacilities;

launchData(allParkingIntroDataLocal).then(allParkdata => {
    console.log("Complete parking data: ", allParkdata);
});

async function launchData(parkingDataEndpoint) {

    return await configureParkingIntroData(parkingDataEndpoint);

}

// The base of this function from: https://vizhub.com/Razpudding/c2a9c9b4fde84816931c404951c79873
async function configureParkingIntroData(parkingDataEndpoint) {

    // Limit the amount of data included in the call
    const limit = parkingDataEndpoint.slice(7900, 7974);
    // Get the unique identifiers from the dataset
    // const parkingPlaceIdentifiers = parkingDataEndpoint.map((parking, index) => {
    //     return parking.identifier;
    // });

    // Get the unique identifiers from the dataset with limit
    const parkingPlaceIdentifiers = limit.map((parking, index) => {
        return parking.identifier;
    });

    // Construct path to complete parking data API endpoint
    const baseUrl = proxyUrl + RDWApiUrl + 'static/';
    const allParkingFacilitiesData = parkingPlaceIdentifiers.map(identifier => getData(baseUrl + identifier));

    // Get all the parking facility data
    const parkingFacilitiesDataArray = await Promise.all(allParkingFacilitiesData);

    // From all the data return only the necessary endpoint
    return parkingFacilitiesDataArray.map(parkingFacility => {
        return {
            city: getCities(parkingFacility),
            chargingPoint: getCarChargingPoints(parkingFacility),
            payment: getPaymentMethods(parkingFacility)
        }
    });
}


// Get the data from the API endpoint
async function getData(apiEndpoint) {

    // Perform a call to the API, this will be paused until completion
    const response = await fetch(apiEndpoint);
    // console.log("Response: ", response);

    // Try to delay fetch - nice tip from Marco
    setTimeout(()=> {let count = 0; count++;}, 2000);

    // Wait for the JSON response
    const data = await response.json();
    // console.log("Data: ", data);

    return data;
}

//Replace undefined city endpoints with null or return city data
function getCities(data) {

        if ((typeof data.parkingFacilityInformation.accessPoints == 'undefined') || (typeof data.parkingFacilityInformation.accessPoints[0] == 'undefined') || (typeof data.parkingFacilityInformation.accessPoints[0].accessPointAddress == 'undefined') || (data.parkingFacilityInformation.accessPoints[0].accessPointAddress.city.length === 0)){
            return null;
        }

        return data.parkingFacilityInformation.accessPoints[0].accessPointAddress.city;

}

//Replace undefined car charging endpoints with null or return car charging data
function getCarChargingPoints(data) {

        if((data.parkingFacilityInformation == null) || (typeof data.parkingFacilityInformation.specifications == 'undefined') || (data.parkingFacilityInformation.specifications[0] == null) || (data.parkingFacilityInformation.specifications[0].chargingPointCapacity == null)){
            return null;
        }

        return  data.parkingFacilityInformation.specifications[0].chargingPointCapacity;

}

//Replace undefined payment endpoints with null or return payment data
function getPaymentMethods(data) {

        if((data.parkingFacilityInformation == null) || (typeof data.parkingFacilityInformation.paymentMethods == 'undefined') || (data.parkingFacilityInformation.paymentMethods.length === 0)){
            return null;
        }

        return data.parkingFacilityInformation.paymentMethods;

}







