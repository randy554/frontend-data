// Set API endpoints
const RDWParkingAPI     = 'https://raw.githubusercontent.com/randy554/myAPI/main/rdwSelectParkeergaragesFaciliteiten.json';
const CBSPopulationAPI  = 'https://raw.githubusercontent.com/randy554/myAPI/main/cbsBevolkingRandstad.json';


getData(CBSPopulationAPI).then( cbsData => {

    console.log("CBS data: ",cbsData[0].aantal);

});

getData(RDWParkingAPI).then( rdwData => {

    console.log("RDW data: ",rdwData[0].city);

});


















