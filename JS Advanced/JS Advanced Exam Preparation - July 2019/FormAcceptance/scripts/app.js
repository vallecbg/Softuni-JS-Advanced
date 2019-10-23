function acceptance() {
	let btn = document.querySelector("#acceptance").addEventListener("click", add);
	let warehouse = document.querySelector("#warehouse");

	function add() {
		let companyHtml = document.querySelector("#fields > td:nth-child(1) > input[type=text]");
		let company = companyHtml.value;
		let productHtml = document.querySelector("#fields > td:nth-child(2) > input[type=text]");
		let product = productHtml.value;
		let quantityHtml = document.querySelector("#fields > td:nth-child(3) > input[type=text]");
		let quantity = Number(quantityHtml.value);
		let scrapeHtml = document.querySelector("#fields > td:nth-child(4) > input[type=text]");
		let scrape = Number(scrapeHtml.value);

		let productQuantity = quantity - scrape;

		//debugger;
		//TODO: check if the quantity and scrape is <= 0 but i think its not needed
		if (company !== "" && typeof (company) === "string" &&
			product !== "" && typeof (product) === "string" &&
			typeof (quantity) === "number" && productQuantity > 0 &&
			typeof (scrape) === "number" &&
			quantity > 0 && scrape > 0) {
			let div = document.createElement("div");
			let p = document.createElement("p");
			p.textContent = `[${company}] ${product} - ${productQuantity} pieces`;
			div.appendChild(p);
			let button = document.createElement("button");
			button.type = "button";
			button.textContent = `Out of stock`;
			button.addEventListener("click", deleteForm)
			div.appendChild(button);

			//append to html
			warehouse.appendChild(div);

			function deleteForm(){
				div.remove();
			}

			companyHtml.value = "";
			productHtml.value = "";
			quantityHtml.value = "";
			scrapeHtml.value = "";
		}

		
	}
}