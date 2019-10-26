function solve() {
   document.querySelector("#add-new > button").addEventListener("click", add);
   document.querySelector("#products > div > button").addEventListener("click", filter);
   let myProducts = document.querySelector("#myProducts > ul");
   //myProducts.innerHTML = "";
   let availableProducts = document.querySelector("#products > ul");
   availableProducts.innerHTML = "";
   let totalPriceDiv = document.querySelector("body > h1:nth-child(4)");
   let totalPrice = 0;
   let buyButton = document.querySelector("#myProducts > button");
   buyButton.addEventListener("click", clearMyProducts);

   function clearMyProducts(evt){
      evt.preventDefault();
      
      myProducts.innerHTML = "";
      totalPrice = 0;
      totalPriceDiv.textContent = `Total Price: ${totalPrice.toFixed(2)}`;
   }

   function filter(evt) {
      evt.preventDefault();

      let searchedProduct = document.querySelector("#filter").value;
      searchedProduct = searchedProduct.toLowerCase();

      for (const line in availableProducts.children) {
         let currLine = Number(line);
         let product = availableProducts.children[currLine];
         //debugger;
         //let productName = product[0];
         if (product !== undefined) {
            let productName = product.getElementsByTagName("span")[0].textContent;
            productName = productName.toLowerCase();

            if (!productName.includes(searchedProduct)) {
               product.style.display = "none";
            }
         }
      }
   }

   //TODO: check if its needed to clear the add product input
   function add(evt) {
      evt.preventDefault();

      let name = document.querySelector("#add-new > input[type=text]:nth-child(2)").value;
      let quantity = document.querySelector("#add-new > input[type=text]:nth-child(3)").value;
      quantity = Number(quantity);
      let price = document.querySelector("#add-new > input[type=text]:nth-child(4)").value;
      price = Number(price);

      let li = document.createElement("li");

      let span = document.createElement("span");
      span.textContent = name;
      li.appendChild(span);

      let strong = document.createElement("strong");
      strong.textContent = `Available: ${quantity}`;
      li.appendChild(strong);

      let div = document.createElement("div");

      let strongPrice = document.createElement("strong");
      //check if needed tofixed
      strongPrice.textContent = `${price.toFixed(2)}`;
      div.appendChild(strongPrice);

      let button = document.createElement("button");
      button.textContent = `Add to Client's List`;
      button.addEventListener("click", addClient);
      div.appendChild(button);
      li.appendChild(div);

      availableProducts.appendChild(li);

      function addClient() {
         let newLi = document.createElement("li");
         totalPrice += price;
         quantity--;
         strong.textContent = `Available: ${quantity}`;
         //Check if needed
         totalPriceDiv.textContent = `Total Price: ${totalPrice.toFixed(2)}`;

         if (quantity === 0) {
            li.remove();
         }
         newLi.innerHTML = name;
         let addedStrongPrice = document.createElement("strong");
         addedStrongPrice.textContent = strongPrice.textContent;
         newLi.appendChild(addedStrongPrice);

         myProducts.appendChild(newLi);
      }
   }
}