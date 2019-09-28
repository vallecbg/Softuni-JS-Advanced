function solve(arr){
    arr.sort((a, b) => sortByLength(a, b));

    function sortByLength(a, b) {
        return a.length - b.length || sortByName(a, b);
    }

    function sortByName (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }

    console.log(arr.join("\n"));
}

solve(['test', 
'Deny',
'omen',
'Default']
)