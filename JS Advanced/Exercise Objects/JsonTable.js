function solve(input){
    let output = '<table>\n';
    for (let line of input) {
        let tokens = JSON.parse(line);
        output += '  <tr>\n';
        output += `     <td>${tokens.name}</td>\n`;
        output += `     <td>${tokens.position}</td>\n`;
        output += `     <td>${tokens.salary}</td>\n`;
        output += '  </tr>\n';
    }

    output += '</table>\n';
    console.log(output);
}

solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}']
);