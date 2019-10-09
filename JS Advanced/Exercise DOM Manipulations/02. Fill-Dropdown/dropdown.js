function addItem() {
    let textInput = document.querySelector("#newItemText");
    let valueInput = document.querySelector("#newItemValue");

    let menu = document.querySelector("#menu");
    let option = document.createElement("option");
    option.textContent = textInput.value;
    option.value = valueInput.value;
    menu.appendChild(option);

    textInput.value = "";
    valueInput.value = "";
}