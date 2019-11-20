function toggle(e) {
    e.textContent = e.textContent === "Show status code"
        ? "Hide status code"
        : "Show status code";
    const statusDiv = e.parentNode.getElementsByClassName("status")[0];
    statusDiv.style.display = statusDiv.style.display === "none" ? "inline" : "none";
}

(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        const source = await fetch("http://127.0.0.1:5500/02.%20HTTP%20Status%20Cats/templates/all-cats.hbs")
            .then(res => res.text());

        const template = Handlebars.compile(source);
        const context = {
            cats: window.cats
        };
        const catsHtml = template(context);

        document.getElementById("allCats")
            .innerHTML = catsHtml;

    }

})()