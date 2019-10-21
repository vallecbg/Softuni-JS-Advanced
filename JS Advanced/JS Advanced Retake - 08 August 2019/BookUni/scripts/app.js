function solve() {
    document.querySelector("body > form > button").addEventListener("click", add);
    let totalPrice = 0;
    let totalStorePrice = document.querySelector("body > h1:nth-child(3)");

    let oldBooksSection = document.querySelector("#outputs > section:nth-child(1) > div");
    let newBooksSection = document.querySelector("#outputs > section:nth-child(2) > div");

    function add(evt) {
        evt.preventDefault();

        let title = document.querySelector("body > form > input[type=text]:nth-child(2)").value;
        let year = document.querySelector("body > form > input[type=number]:nth-child(4)").value;
        year = Number(year);
        let price = document.querySelector("body > form > input[type=number]:nth-child(6)").value;
        price = Number(price);
        //price = price.toFixed(2);

        //TODO: check if price >= 0 or price > 0
        if (typeof (title) === "string" && title !== "" && year > 0 && price > 0) {
            let div = document.createElement("div");
            div.classList.add("book");
            let p = document.createElement("p");
            p.textContent = `${title} [${year}]`;
            div.appendChild(p);

            let buyBtn = document.createElement("button");
            buyBtn.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
            buyBtn.addEventListener("click", buy);
            div.appendChild(buyBtn);

            if (year >= 2000) {
                let moveBtn = document.createElement("button");
                moveBtn.textContent = `Move to old section`;
                moveBtn.addEventListener("click", moveToOld);
                div.appendChild(moveBtn);

                newBooksSection.appendChild(div);
            } else {
                price *= 0.85;
                buyBtn.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
                oldBooksSection.appendChild(div);
            }


            function buy() {
                totalPrice += price;
                totalStorePrice.textContent = `Total Store Profit: ${totalPrice.toFixed(2)} BGN`;
                div.remove();
            }

            function moveToOld() {
                let btnToDelete = div.querySelector("button:nth-child(3)");
                
                price *= 0.85;
                buyBtn.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
                btnToDelete.remove();
                div.remove();
                oldBooksSection.appendChild(div);
            }
        }


    }
}