function showInfo(e) {
    const infoDiv = e.parentNode.getElementsByClassName("info")[0];
    infoDiv.style.display = infoDiv.style.display === "none" ? "block" : "none";
}

(() => {
    renderMonkeyTemplate();

    async function renderMonkeyTemplate() {
        const source = await fetch("http://127.0.0.1:5500/03.%20Popular%20Monkeys/templates/all-monkeys.hbs")
            .then(res => res.text());

        const template = Handlebars.compile(source);

        const context = {
            monkeys: window.monkeys
        };
        const monkeysHtml = template(context);

        document.getElementById("allMonkeys")
            .innerHTML = monkeysHtml;

    }

})()