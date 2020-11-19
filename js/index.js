// Set API endpoint
// const parkeerGaragesEndpoint    = `https://npropendata.rdw.nl/parkingdata/v2/`;
const parkeerGaragesEndpoint    = 'https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json';

// Perform API call
getData(parkeerGaragesEndpoint).then(RDWData => {

     console.log("MY RDW DATA: ", RDWData);
     // console.log("MY RDW DATA: ", RDWData[0]);
    // console.log("THIS IS IT: ", RDWData[0].parkingFacilityInformation.name);
    // console.log('City: ', RDWData[0].parkingFacilityInformation.accessPoints[0].accessPointAddress.city);

    // console.log("Car charging spot: ", RDWData[0].parkingFacilityInformation.specifications[0].chargingPointCapacity);

    const listCities = getCities(RDWData);
    console.log('All available cities: ', listCities);
    const listChargingCapacity = getCarChargingPoints(listCities);
    console.log('All charging capacity from cities', listChargingCapacity);

    // console.log(RDWData[0].parkingFacilityInformation.paymentMethods);

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

    let counter = 0;

    const listCities = data.map( (value, index) => {

        if ((typeof value.parkingFacilityInformation.accessPoints[0] == 'undefined') || (typeof value.parkingFacilityInformation.accessPoints[0].accessPointAddress == 'undefined') || (value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city.length === 0)){
            return null;
        }
        // console.log("alle data hier nog: " + index + " - " + value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
        // console.log("TYPE: " + typeof value.parkingFacilityInformation.accessPoints[0].accessPointAddress.city);
        // return value.parkingFacilityInformation.accessPoints[0].accessPointAddress;
        counter++;
        console.log("GOOD cities: ", counter);
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
        counter++;
        console.log("GOOD charging: ", counter);
        return value;
    });

    return listchargingPoints;
    
}

function getPaymentMethods(data) {

    let counter = 0;

    const listPaymentMethods = data.map((value, index) => {

        // if((value == null) || (value.specifications[0].chargingPointCapacity == null)){
        //     return null;
        // }
        console.log("CHARGE: ", value.specifications);
        // console.log("Car charging spot: " + index + " - ", value.specifications[0].chargingPointCapacity);
        // counter++;
        // console.log("GOOD charging: ", counter);
        return value;
    });

    // return listPaymentMethods;

}




