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

    // console.log("RDW data: ",rdwData[2].city);
    const removeEmptyCities = removeNullValuesFromCity(rdwData);
    console.log("List without null cities: ",removeEmptyCities);

    // const amsterdamList = filterByCity(removeEmptyCities, "Amsterdam");
    // const rotterdamList = filterByCity(removeEmptyCities, "Rotterdam");
    // const denHaagList = filterByCity(removeEmptyCities, "Den Haag");
    const utrechtList = filterByCity(removeEmptyCities, "Utrecht");
    // console.log("City: ", amsterdamList);
    // console.log("City: ", rotterdamList);
    // console.log("City: ", denHaagList);
    console.log("City: ", utrechtList);
    const totalChargingPoints = totalAmountChargingPoints(utrechtList);
    console.log("Total amount of charging points: ", totalChargingPoints.totalChargingPoints + " total amount of cities: " + totalChargingPoints.amountOfCities);

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


function removeNullValuesFromCity(data) {

    return data.filter(value => {

        if (value.city != null){
            return value;
        }

    });
}

function filterByCity(data, city) {

    return data.filter(value => {

        if (value.city == city){
            return value;
        }

    });
}

function totalAmountChargingPoints(data) {

    let charginPointstats = {amountOfCities: 0, totalChargingPoints: 0};

    data.map(value => {

        if (value.chargingPoint > 0){
            charginPointstats.totalChargingPoints += value.chargingPoint;
        }

        charginPointstats.amountOfCities++;

    });

    return charginPointstats;
}
















