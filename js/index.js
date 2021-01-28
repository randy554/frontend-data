// Set API endpoints
const RDWParkingAPI     = 'https://raw.githubusercontent.com/randy554/myAPI/main/rdwSelectParkeergaragesFaciliteiten.json';
const CBSPopulationAPI  = 'https://raw.githubusercontent.com/randy554/myAPI/main/cbsBevolkingRandstad.json';


// getData(CBSPopulationAPI).then( cbsData => {
//
//     console.log("CBS data: ", cbsData);
//     const test3 = removeWordFromFieldValue(cbsData, "Regio's" ,"(gemeente)");
//     console.log("TEST3: ", test3);
//     const test4 = removeWhitespaceFromFieldValue(test3, "Regio's");
//     console.log("TEST4: ", test4);
//     const test5 = replaceFieldValue(test4, "Regio's", "'s-Gravenhage", "Den Haag");
//     console.log("TEST5: ", test5);
//     const test6 = filterCBSDataByYear(test5, '2020');
//     console.log('Filter by year:', test6);
// });
//

getData(RDWParkingAPI).then( rdwData => {

    const removeEmptyCities = removeNullValuesFromCity(rdwData);
    console.log("List without null cities: ",removeEmptyCities);
    const utrechtList = filterByCity(removeEmptyCities, "Utrecht");
    console.log("City: ", utrechtList);
    const totalChargingPoints = totalAmountChargingPoints(utrechtList);
    console.log("Total amount of charging points: ", totalChargingPoints.totalChargingPoints + " total amount of cities: " + totalChargingPoints.amountOfCities);
    const allPaymethods = getAllPaymentMethods(utrechtList);
    console.log("PAYMENT METHODS: ", allPaymethods);
    console.log("PAYMETHODS COUNT: ", getPaymentMethodCount(allPaymethods, "AMEX"));
    const allpaymethods = getAllPaymentMethodCount(allPaymethods);
    console.log("ALL PAYMETHODS COUNT: ", allpaymethods);


});

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

// Remove cities with null value from the list
function removeNullValuesFromCity(data) {

    return data.filter(value => {

        if (value.city != null){
            return value;
        }

    });
}

// Select data per city
function filterByCity(data, city) {

    return data.filter(value => {

        if (value.city == city){
            return value;
        }

    });
}

// Calculate the amount of charging points per city
function totalAmountChargingPoints(data) {

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






