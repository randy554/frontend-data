// Set API endpoint
const RDWApiUrl = 'https://npropendata.rdw.nl/parkingdata/v2/';
const proxyUrl  = 'https://cors-anywhere.herokuapp.com/';
const parkeerGaragesEndpoint    = 'https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json';

// Perform API call
// getData(parkeerGaragesEndpoint).then(RDWData => {
//
//      // console.log("MY RDW DATA: ", RDWData);
//      // console.log("MY RDW DATA: ", RDWData[0]);
//     // console.log("THIS IS IT: ", RDWData[0].parkingFacilityInformation.name);
//     // console.log('City: ', RDWData[0].parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
//
//     // console.log("Car charging spot: ", RDWData[0].parkingFacilityInformation.specifications[0].chargingPointCapacity);
//
//     const listCities = getCities(RDWData);
//     // console.log('All available cities: ', listCities);
//     const listChargingCapacity = getCarChargingPoints(listCities);
//     // console.log('All charging capacity from cities: ', listChargingCapacity);
//     const listPaymentMethods = getPaymentMethods(listChargingCapacity);
//     // console.log('All payments: ', listPaymentMethods);
//     // console.log(RDWData[0].parkingFacilityInformation.paymentMethods);
//
//
// });

const RDWAllData = NPRORDWAllData[0].ParkingFacilities;

// launchData();

async function launchData() {

    // Get all RDW parking data
    // const allParkingFacilitiesData = getData(proxyUrl+RDWApiUrl);
    const allParkingIntroData = RDWAllData;
    console.log("All parking intro data: ", allParkingIntroData);

    const completeParkingData = await configureParkingIntroData(allParkingIntroData);
    console.log("Complete parking data: ", completeParkingData);

    return completeParkingData;

}

// getAllRDWData(RDWAllData).then(allData => {
//     console.log("Einde: ", allData);
// });

async function configureParkingIntroData(allParkingIntroData) {

    // const limit = allParkingIntroData.slice(7900, 7974);
    // Get the unique identifiers from dataset
    const parkingPlaceIdentifiers = allParkingIntroData.map((parking, index) => {
        return parking.identifier;
    });

    // const parkingPlaceIdentifiers = limit.map((parking, index) => {
    //     return parking.identifier;
    // });
    console.log("Unique identifiers: ", parkingPlaceIdentifiers);

    // Construct path to complete parking data API endpoint
    const baseUrl = proxyUrl + RDWApiUrl + 'static/';
    const allParkingFacilitiesData = parkingPlaceIdentifiers.map(identifier => getData(baseUrl + identifier));

    console.log("All parking facilities data: ", allParkingFacilitiesData);
    const parkingFacilitiesDataArray = await Promise.all(allParkingFacilitiesData);

    const selectionParkingFacilitiesDataset = parkingFacilitiesDataArray.map(parkingFacility => {
        console.log("PF: ", parkingFacility);
        return {
            city: getCities(parkingFacility),
            chargingPoint: getCarChargingPoints(parkingFacility),
            payment: getPaymentMethods(parkingFacility)
        }
    });

    return selectionParkingFacilitiesDataset;
}


async function getAllRDWData(allRDWData) {
    let counter = 0;
    // console.log("kijken: ", allRDWData[0].identifier);

    const parkingPlaceIdentifiers = allRDWData.map(parking => {
        counter++;
        // console.log("kijken " + counter + ": ", parking.identifier);
        return parking.identifier;
    });

    console.log("all id's: ", parkingPlaceIdentifiers);

    // set baseUrl
    const baseUrl = proxyUrl + RDWApiUrl + 'static/';

    // get all parkingfacilities data
    const allParkingFacilitiesData = parkingPlaceIdentifiers.map(identifier => getData(baseUrl + identifier));
    console.log("AllparFacilitiesData: ", allParkingFacilitiesData);
    const facilitiesDataArray = await Promise.all(allParkingFacilitiesData);
    console.log("facilitiesDataArray: ",  facilitiesDataArray);

    const listFacilitiesData = facilitiesDataArray.map((item, index) => {

        // if(index > 4){
        //     return

        // }
        console.log("Gelukt: " + index + " - " + item.parkingFacilityInformation.accessPoints);
    });

    return listFacilitiesData;


}

// Get the data from the API endpoint
async function getData(apiEndpoint) {

    // Perform a call to the API, this will be paused until completion
    const response = await fetch(apiEndpoint);
    console.log("Response: ", response);

    setTimeout(()=> {let count = 0; count++;}, 2000);

    // Wait for the JSON response
    const data = await response.json();
    // console.log("GETTTData: ", data);

    return data;
}

// async function getParkingFacilitiesData() {
//
//         const response = await fetch(apiEndpoint);
//         console.log("Response: ", response);
// }

function getCities(data) {

    console.log("In cities: ", data.parkingFacilityInformation.accessPoints);

        if ((typeof data.parkingFacilityInformation.accessPoints == 'undefined') || (typeof data.parkingFacilityInformation.accessPoints[0] == 'undefined') || (typeof data.parkingFacilityInformation.accessPoints[0].accessPointAddress == 'undefined') || (data.parkingFacilityInformation.accessPoints[0].accessPointAddress.city.length === 0)){
            return null;
        }

        return data.parkingFacilityInformation.accessPoints[0].accessPointAddress.city;


}

function getCarChargingPoints(data) {

    console.log("In charging: ", data.parkingFacilityInformation.specifications);

        if((data.parkingFacilityInformation == null) || (typeof data.parkingFacilityInformation.specifications == 'undefined') || (data.parkingFacilityInformation.specifications[0] == null) || (data.parkingFacilityInformation.specifications[0].chargingPointCapacity == null)){
            return null;
        }

        return  data.parkingFacilityInformation.specifications[0].chargingPointCapacity;
    
}

function getPaymentMethods(data) {

    console.log("In payment: ", data.parkingFacilityInformation.paymentMethods);

        if((data.parkingFacilityInformation == null) || (typeof data.parkingFacilityInformation.paymentMethods == 'undefined') || (data.parkingFacilityInformation.paymentMethods.length === 0)){
            return null;
        }

        return data.parkingFacilityInformation.paymentMethods;

}







