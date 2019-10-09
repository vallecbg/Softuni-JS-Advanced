function toggle() {
    let btn = document.getElementsByClassName("button")[0];
    let textbox = document.getElementById('extra');
    if(btn.textContent === "More"){
        textbox.style.display = 'block';
        btn.textContent = 'Less';
    } else if (btn.textContent === "Less"){
        textbox.style.display = 'none';
        btn.textContent = 'More';
    }
}