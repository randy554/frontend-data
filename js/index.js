// Set API endpoint
const RDWApiUrl = 'https://npropendata.rdw.nl/parkingdata/v2/';
const proxyUrl  = 'https://cors-anywhere.herokuapp.com/';
const parkeerGaragesEndpoint    = 'https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json';

// Perform API call
getData(parkeerGaragesEndpoint).then(RDWData => {

     // console.log("MY RDW DATA: ", RDWData);
     // console.log("MY RDW DATA: ", RDWData[0]);
    // console.log("THIS IS IT: ", RDWData[0].parkingFacilityInformation.name);
    // console.log('City: ', RDWData[0].parkingFacilityInformation.accessPoints[0].accessPointAddress.city);

    // console.log("Car charging spot: ", RDWData[0].parkingFacilityInformation.specifications[0].chargingPointCapacity);

    const listCities = getCities(RDWData);
    // console.log('All available cities: ', listCities);
    const listChargingCapacity = getCarChargingPoints(listCities);
    // console.log('All charging capacity from cities: ', listChargingCapacity);
    const listPaymentMethods = getPaymentMethods(listChargingCapacity);
    // console.log('All payments: ', listPaymentMethods);
    // console.log(RDWData[0].parkingFacilityInformation.paymentMethods);


});

const RDWAllData = NPRORDWAllData[0].ParkingFacilities.slice(100, 10);

getAllRDWData(RDWAllData).then(allData => {
    console.log("Einde: ", allData);
});


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
    // console.log("Response: ", response);

    // Wait for the JSON response
    const data = await response.json();
    console.log("GETTTData: ", data);

    return data;
}

// async function getParkingFacilitiesData() {
//
//         const response = await fetch(apiEndpoint);
//         console.log("Response: ", response);
// }

function getCities(data) {

    let counter = 0;

    const listCities = data.map( (value, index) => {

        if ((typeof value.parkingFacilityInformation.accessPoints[0] == 'undefined') || (typeof value.parkingFacilityInformation.accessPoints[0].accessPointAddress == 'undefined') || (value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city.length === 0)){
            return null;
        }
        // console.log("alle data hier nog: " + index + " - " + value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
        // console.log("TYPE: " + typeof value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
        // return value.parkingFacilityInformation.accessPoints[0].accessPointAddress;
        // counter++;
        // console.log("GOOD cities: ", counter);
        return value.parkingFacilityInformation;
    });

    return listCities;
}

function getCarChargingPoints(data) {

    let counter = 0;

    const listchargingPoints = data.map((value, index) => {

        if((value == null) || (value.specifications[0].chargingPointCapacity == null)){
            return null;
        }
        // console.log("CHARGE: ", value.specifications);
        // console.log("Car charging spot: " + index + " - ", value.specifications[0].chargingPointCapacity);
        // counter++;
        // console.log("GOOD charging: ", counter);
        return value;
    });

    return listchargingPoints;
    
}

function getPaymentMethods(data) {

    let counter = 0;

    const listPaymentMethods = data.map((value, index) => {

        if((value == null) || (value.paymentMethods.length === 0)){
            return null;
        }

        // counter++;
        // console.log("PAYMENT: ", value.paymentMethods + " - " + counter);
        return value;
    });

    return listPaymentMethods;

}






