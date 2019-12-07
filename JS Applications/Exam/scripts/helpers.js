import { get } from "./requester.js";

export function passwordCheck(password, rePassword) {
    if (password !== rePassword) {
        alert('Your password and confirmation password do not match.');
        return false;
    }
    if (password === '' || rePassword === '') {
        alert('Password must be filled out');
        return false;
    }
    return true;
}

export function setHeaderInfo(ctx) {
    ctx.isAuth = localStorage.getItem("authToken") !== null;
    ctx.username = localStorage.getItem("username");
    ctx._id = localStorage.getItem("userId");
}

export function getSessionInfo(ctx) {
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            ctx[key] = localStorage[key];
        }
    }
}

export function setSessionInfo(userInfo) {
    localStorage.setItem('username', userInfo.username);
    localStorage.setItem('authToken', userInfo._kmd.authtoken);
    localStorage.setItem("userId", userInfo._id);
}

export function loadAllPartials(partials) {
    const defaultPartials = {
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs',
    };

    for (const key in partials) {
        if (partials.hasOwnProperty(key)) {
            defaultPartials[key] = partials[key];
        }
    }
    return defaultPartials;
}

export function displayError(message){
    const errorBox = document.getElementById("errorBox");
    errorBox.style.display = "block";
    errorBox.textContent = message;
    setTimeout(() => {
        errorBox.style.display = "none"
    }, 4000);
}

export function displaySuccess(message){
    const successBox = document.getElementById("successBox");
    successBox.style.display = "block";
    successBox.textContent = message;
    setTimeout(() => {
        successBox.style.display = "none"
    }, 4000);
}

export function displayLoading(){
    const loadingBox = document.getElementById("loadingBox");
    loadingBox.style.display = "block";
    setTimeout(() => {
        loadingBox.style.display = "none"
    }, 2000);
}

export function getTrek(id) {
    return get("appdata", `treks/${id}`, "Kinvey");
}