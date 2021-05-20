window.addEventListener('load', () => {
    const login = document.querySelector('.login-form');

    if (login) {
        const inputs = login.querySelectorAll('input');
        const errorLogin = login.querySelector('#login-error')

        function validateLogin (event) {
            const input = event.target;
            const value = input.value;
            let hasError = false;

            if (value.length === 0) {
                errorLogin.style.display = 'inline-block';
                errorLogin.innerHTML = 'Fields cannot be empty!'
            } else {

                for (field of inputs) {
                    if (field.value === '') {
                        hasError = true;
                    }
                }

                if (!hasError) {
                    errorLogin.innerHTML = '';
                    errorLogin.style.display = 'none';
                }
            }
        }

        function canSendLogin (event) {
            event.preventDefault();

            for (input of inputs) {
                if (input.value === '') {
                    errorLogin.style.display = 'inline-block';
                    errorLogin.innerHTML = 'Fields cannot be empty!'
                }
            }

            if (errorLogin.innerHTML === '') {
                login.submit();
            }
        }

        login.addEventListener('submit', canSendLogin)

        for (input of inputs) {
            input.addEventListener('input', validateLogin);
            input.addEventListener('blur', validateLogin);
        }
    }
})