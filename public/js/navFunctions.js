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

    const blur = document.querySelector('#back-blur');
    const login = document.querySelector('.login-form');

    if (login && login.id == 'shift-login') {
        blur.style.opacity = 1;
        blur.style.display = 'inline-block';
    }

    function openLogin() {

        let offset = document.querySelector('nav').offsetHeight;
        let position = ((window.innerHeight + offset) / 2);

        if (login.offsetTop == '-100') {

            login.style.top = position + 'px';
            blur.style.opacity = 1;
            blur.style.top = 'unset';

        } else if (login.offsetTop - position <= 0.5) {

            login.style.top = '-100px';
            blur.style.opacity = 0;
            
            setTimeout(() => {
                blur.style.top = '-100%';
            }, 400);
        }
    };

    const loginButton = document.querySelector('#login');

    if (hamLogin = document.querySelector('#hamLogin')) {
        hamLogin.addEventListener('click', openLogin);
    }

    loginButton ? blur.addEventListener('click', openLogin) : undefined;
    loginButton ? loginButton.addEventListener('click', openLogin) : undefined;


    //Function to Logout

    function logoutUser () {
        window.location.href = '/logout';
    }

    if (hamLogout = document.querySelector('#hamLogout')) {
        hamLogout.addEventListener('click', logoutUser);
    }
})