function solve() {
    let namePattern = / [A-Z][A-Za-z]*-[A-Z][A-Za-z]*( |\.-[A-Z][A-Za-z]* )/;
    let airportPattern = / [A-Z]{3}\/[A-Z]{3} /;
    let numberPattern = / [A-Z]{1,3}[\d]{1,5} /;
    let companyPattern = /- [A-Z][A-Za-z]*\*[A-Z][A-Za-z]* /;
    let informationToPrintPattern = /[A-Za-z]+$/;

    let informationText = document.querySelector("#string").value;

    let informationToPrint = informationText.match(informationToPrintPattern)[0].trim();
    let name = informationText.match(namePattern)[0].trim().replace(/-/g, " ");
    let [fromAirport, toAirport] = informationText.match(airportPattern)[0].trim().split("/");
    let number = informationText.match(numberPattern)[0].trim();
    let company = informationText.match(companyPattern)[0].replace("- ", "").replace(/\*/g, " ").trim();

    let result = document.querySelector("#result");
 
    if (informationToPrint === "name") {
        result.innerHTML = (`Mr/Ms, ${name}, have a nice flight!`);
    } else if (informationToPrint === "flight") {
        result.innerHTML = (`Your flight number ${number} is from ${fromAirport} to ${toAirport}.`);
    } else if (informationToPrint === "company") {
        result.innerHTML = (`Have a nice flight with ${company}.`);
    } else if (informationToPrint === "all") {
        result.innerHTML = (`Mr/Ms, ${name}, your flight number ${number} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${company}.`);
    }
}