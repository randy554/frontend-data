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
    console.log("Lijst zonder null steden: ",removeNullValuesFromCity(rdwData));
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
















