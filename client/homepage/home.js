const homeBtn = document.getElementById('home-btn');
const myListBtn = document.getElementById('my-list-btn');
const formBtn = document.getElementById('form-btn');

homeBtn.addEventListener('click', goToHomePage);
myListBtn.addEventListener('click', goToMyListPage);
formBtn.addEventListener('click', goToFormPage);

function goToHomePage() {
    window.location.href = '../homepage/home.html';
}

function goToMyListPage() {
    window.location.href = '../my-list/my-list.html';
}

function goToFormPage() {
    window.location.href = '../form/form.html';
}
