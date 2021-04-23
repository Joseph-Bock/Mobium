window.addEventListener('load', function () {

    console.log('Site has finished loading');

    //Function to open Navigation in mobile

    const hamButton = document.querySelector('#hamburguer');
    const checkbox = document.querySelector('#checkbox');

    hamButton.addEventListener('click', function () {
        const menu = document.querySelector('#menu');

        if (checkbox.checked) {
            menu.style.left = '-300px';
            hamButton.style.backgroundColor = '';
        } else {
            hamButton.style.backgroundColor = 'rgb(230, 230, 230)';
            menu.style.left = '0px';
        };
    })


    //Function to bring down the Login menu

    function openLogin() { //Open login menu
        if (login.style.top == '-200px' || login.offsetTop == -200) {
            login.style.top = 'calc(50% + 50px)';
        } else {
            login.style.top = '-200px';
        }
    };

    const login = document.querySelector('.login-form');
    const loginButton = document.querySelector('#login');

    if (hamLogin = document.querySelector('#hamLogin')) {
        hamLogin.addEventListener('click', openLogin);
    }

    loginButton.addEventListener('click', openLogin);

    //Function to Logout

    function logoutUser () {
        window.location.href = '/logout';
    }

    if (hamLogout = document.querySelector('#hamLogout')) {
        hamLogout.addEventListener('click', logoutUser);
    }
})