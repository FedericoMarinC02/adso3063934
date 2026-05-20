const views = document.querySelectorAll('main');
let currentView = 0

//Buttons & anchors
const btnLogin = document.querySelector('.btnLogin');
const btnLogout = document.querySelector('.btnLogout');
const btnAdd = document.querySelector('.btnAdd');
const btnBack = document.querySelectorAll('.btnBack');
const btnShow = document.querySelectorAll('.btnShow');
const btnEdit = document.querySelectorAll('.btnEdit');
const btnDelete = document.querySelectorAll('.btnDelete');

btnLogin.addEventListener('click', () => {
    currentView = 1
    showView()
})

btnLogout.addEventListener('click', () => {
    currentView = 0
    showView()
})

btnAdd.addEventListener('click', () => {
    currentView = 2
    showView()
})

btnBack.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView()
    })
})

btnShow.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 3
        showView()
    })
})

btnEdit.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 4
        showView()
    })
})



function showView() {
    views.forEach(element=> {
        element.classList.remove('animateView')
        element.style.display = 'none';
    })
    views[currentView].classList.add('animateView')
    views[currentView].style.display = 'block';
}

showView();