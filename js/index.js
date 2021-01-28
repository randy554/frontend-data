// Set API endpoints
const RDWParkingAPI     = 'https://raw.githubusercontent.com/randy554/myAPI/main/rdwSelectParkeergaragesFaciliteiten.json';
const CBSPopulationAPI  = 'https://raw.githubusercontent.com/randy554/myAPI/main/cbsBevolkingRandstad.json';


getData(CBSPopulationAPI).then( cbsData => {

    // Remove a word from a field value
    const removedWordGemeenteFromRegioField = removeWordFromFieldValue(cbsData, "Regio's" ,"(gemeente)");
    console.log("Remove (gemeente) in Regio field: ", removedWordGemeenteFromRegioField);

    // Remove whitespace from field
    const removeWhitespaceFromRegioField = removeWhitespaceFromFieldValue(removedWordGemeenteFromRegioField, "Regio's");
    console.log("Remove whitespace in Regio field: ", removeWhitespaceFromRegioField);

    // Replace a field value with another value
    const renameCityField = replaceFieldValue(removeWhitespaceFromRegioField, "Regio's", "'s-Gravenhage", "Den Haag");
    console.log("Rename city : ", renameCityField);

    // Get cities data per year
    const getCityDataByYear = filterCBSDataByYear(renameCityField, '2020');
    console.log('Filter by year:', getCityDataByYear);

});


// getData(RDWParkingAPI).then( rdwData => {
//
//     // Remove all null values from city field
//     const removeEmptyCities = removeNullValues(rdwData, "city");
//
//     // Select data per city
//     const listPerCity = filterByField(removeEmptyCities, "city", "Utrecht");
//
//     // List charging point statistics per city
//     const listChargingPointsStatsPerCity = getChargingPointsStats(listPerCity);
//
//     // List all different payment methods per city
//     const listPaymethodsPerCity = getAllPaymentMethods(listPerCity);
//
//     // Give totals of payment methods per city
//     const listCountPerPaymethodsPerCity = getAllPaymentMethodCount(listPaymethodsPerCity);
//
//     // Give the total amount of a payment method
//     const listCountPaymethodPerCity = getPaymentMethodCount(listPaymethodsPerCity, "AMEX");
//
// });

// Return data from a certain year
function filterCBSDataByYear(data, year) {

    return data.filter(value => {

        if (value.Perioden == year){
            return value;
        }

    });
}

// Remove word from regio value
function removeGemeenteFromRegio (data, keyword) {

    return data.map(value => {

        if ((value["Regio's"].indexOf(keyword)) > 0){
            value["Regio's"] = value["Regio's"].replace(keyword, '');
            return value;
        }else {
            return value;
        }

    });
}

// Remove word from field value
function removeWordFromFieldValue (data, field, keyword) {

    return data.map(value => {

        if ((value[field].indexOf(keyword)) > 0){
            value[field] = value[field].replace(keyword, '');
            return value;
        }else {
            return value;
        }

    });
}

// Remove whitespace from regio value
function removeWhitespaceFromRegio (data) {

    return data.map(value => {

        value["Regio's"] = value["Regio's"].trim();
        return value;

    });
}

// Remove whitespace from field value
function removeWhitespaceFromFieldValue (data, field) {

    return data.map(value => {

        value[field] = value[field].trim();
        return value;

    });
}

// Replace regio value
function replaceRegioValue(data, currentRegioValue, newRegioValue) {

    return data.map(value => {

        if (value["Regio's"] === currentRegioValue){
            value["Regio's"] = newRegioValue;
        }
        return value;
    });
}

// Replace field value
function replaceFieldValue(data, field, currentRegioValue, newRegioValue) {

    return data.map(value => {

        if (value[field] === currentRegioValue){
            value[field] = newRegioValue;
        }
        return value;
    });
}


// Remove null value from field
function removeNullValues(data, field) {

    return data.filter(value => {

        if (value[field] != null){
            return value;
        }

    });
}

// Select data by field
function filterByField(data, field, keyword) {

    return data.filter(value => {

        if (value[field] == keyword){
            return value;
        }

    });
}

// Calculate the amount of charging points per city
function getChargingPointsStats(data) {

    let charginPointstats = {amountOfCities: 0, totalChargingPoints: 0};


    data.forEach(value => {

        if (value.chargingPoint > 0){
            charginPointstats.totalChargingPoints += value.chargingPoint;
        }

        charginPointstats.amountOfCities++;

    });

    return charginPointstats;
}

// Get a list of al the payment methods
function getAllPaymentMethods(data) {

    let paymentMethods = [];

    data.forEach(value => {

        if (value.payment != null){

            value.payment.forEach(pay =>{

               paymentMethods.push(pay.method);

            });
        }

    });

    return paymentMethods;
    
}

// Get the occurrence amount of a payment method
function getPaymentMethodCount(data, paymentmethod) {

    let payMethodstats = {payMethod: paymentmethod, totalCount: 0};

    data.forEach(value => {

        if (value == paymentmethod){
            payMethodstats.totalCount++;
        }

    });

    return payMethodstats;
}

//Get the occurrence amount of a all payment methods
function getAllPaymentMethodCount(data) {

    return data.reduce((newList, payMethod) => {

        if(newList.hasOwnProperty(payMethod)){
            newList[payMethod]++;
        }else{
            newList[payMethod] = 1;
        }

        return newList;

    }, {});

}






