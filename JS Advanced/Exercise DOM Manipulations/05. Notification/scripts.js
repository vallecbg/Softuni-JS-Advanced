function notify(message) {
    let notification = document.getElementById('notification');
    let div = document.createElement('div');
    div.textContent = message;
    notification.appendChild(div);
    notification.style.display = 'block';

    setTimeout(
        function() {
            notification.style.display = 'none';
        },
        2000
    );
}