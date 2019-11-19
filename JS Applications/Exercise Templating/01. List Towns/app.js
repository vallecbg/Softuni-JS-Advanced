(function () {
    document.getElementById("btnLoadTowns")
        .addEventListener("click", async function () {
            const towns = document.getElementById("towns")
                .value.split(", ");

            const source = 
            await fetch("http://127.0.0.1:5500/01.%20List%20Towns/towns.hbs")
            .then(res => res.text());

            const template = Handlebars.compile(source);
            const context = {
                towns
            }; // Always an OBJECT
            const townsHtml = template(context);

            document.getElementById("root")
            .innerHTML = townsHtml;
        })
}())