// Set API endpoints
const RDWParkingAPI     = 'https://raw.githubusercontent.com/randy554/myAPI/main/rdwSelectParkeergaragesFaciliteiten.json';
const CBSPopulationAPI  = 'https://raw.githubusercontent.com/randy554/myAPI/main/cbsBevolkingRandstad.json';


// getData(CBSPopulationAPI).then( cbsData => {
//
//     // console.log("CBS data: ",cbsData[0].aantal);
//     //
//     // cbsData.map(value => {
//     //     console.log("CBS waarde: ", value.Perioden + " Datatype: " + getValueType(value.Perioden));
//     // });
//
//     // const test = setPropertyTypeToNumber(cbsData, "Perioden");
//     // console.log("TEST: ", test);
//
//     console.log("CBS data: ", cbsData);
//
//     // const test2 = filterCBSDataByYear(cbsData, '2015');
//     const test3 = removeGemeenteFromRegio(cbsData, "(gemeente)");
//     console.log("TEST3: ", test3);
//     const test4 = removeWhitespaceFromRegio(test3);
//     console.log("TEST4: ", test4);
//     const test5 = changeRegioValue(test4, "'s-Gravenhage", "Den Haag");
//     console.log("TEST5: ", test5);
//
// });

getData(RDWParkingAPI).then( rdwData => {

    const removeEmptyCities = removeNullValuesFromCity(rdwData);
    console.log("List without null cities: ",removeEmptyCities);

    // const amsterdamList = filterByCity(removeEmptyCities, "Amsterdam");
    // const rotterdamList = filterByCity(removeEmptyCities, "Rotterdam");
    // const denHaagList = filterByCity(removeEmptyCities, "Den Haag");
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

function filterCBSDataByYear(data, year) {

    return data.filter(value => {

        if (value.Perioden == year){
            return value;
        }

    });
}

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

function removeWhitespaceFromRegio (data) {

    return data.map(value => {

        value["Regio's"] = value["Regio's"].trim();
        return value;

    });
}

function changeRegioValue(data, currentRegioValue, newRegioValue) {

    return data.map(value => {

        if (value["Regio's"] === currentRegioValue){
            value["Regio's"] = newRegioValue;
        }
        return value;
    });
}

// remove cities with null value from the list
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






