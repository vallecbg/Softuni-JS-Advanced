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
    ctx.isAuth = sessionStorage.getItem("authToken") !== null;
    ctx.fullName = sessionStorage.getItem("fullName");
}

export function getSessionInfo(ctx) {
    for (const key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            ctx[key] = sessionStorage[key];
        }
    }
}

export function setSessionInfo(userInfo) {
    sessionStorage.setItem('fullName', userInfo.firstName + " " + userInfo.lastName);
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem("userId", userInfo._id);
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
    }, 2000);
}

export function displaySuccess(message){
    const successBox = document.getElementById("successBox");
    successBox.style.display = "block";
    successBox.textContent = message;
    setTimeout(() => {
        successBox.style.display = "none"
    }, 4000);
}