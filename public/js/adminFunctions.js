window.addEventListener('load', function () {

    console.log('Admin Panel Loaded');

    // Switch Forms //

    const userButton = document.querySelector('#user-button');
    const userPanel = document.querySelector('#user-admin');

    const productButton = document.querySelector('#product-button');
    const productPanel = document.querySelector('#product-admin');

    function showUserPanel () {
        userButton.style.background = 'white';
        userButton.style.color = '#892fd8';
        userButton.style.boxShadow = 'unset';

        productButton.style.background = '#892fd8';
        productButton.style.color = 'white';
        productButton.style.boxShadow = '0 0 10px rgb(0 0 0 / 45%) inset';

        productPanel.style.display = 'none';
        userPanel.style.display = 'grid';
    }

    function showProductPanel () {
        userButton.style.background = '#892fd8';
        userButton.style.color = 'white';
        userButton.style.boxShadow = '0 0 10px rgb(0 0 0 / 45%) inset';

        productButton.style.background = 'white';
        productButton.style.color = '#892fd8';
        productButton.style.boxShadow = 'unset';
        
        productPanel.style.display = 'grid';
        userPanel.style.display = 'none';
    }

    userButton.addEventListener('click', showUserPanel);
    productButton.addEventListener('click', showProductPanel);


    // Form Logic //

    function getRoute (form) {
        const route = form.getAttribute('id').split('-', 1)[0];
        return (route + 's');
    }

    function fetchData (event) {
        const form = event.target.parentElement;
        const id = event.target.value;

        if (!isNaN(parseInt(id))) {
            fetch(getRoute(form) + '/' + id)
            .then(response => {
                return response.text();
            }).then(data => {
                if (data.length) {
                    const index = getRoute(form).slice(0, -1);

                    updateForm(form, JSON.parse(data)[index]);
                    displayErrors(form, undefined);
                } else {
                    updateForm(form, undefined);
                    displayErrors(form, undefined);
                }
            })
        } else {
            updateForm(form, undefined);
            displayErrors(form, undefined);
        }
    }

    function changeMethod (form, bool, id, setDelete) {
        bool ? form.action = getRoute(form) + '/' + id + '?_method=PUT' : form.action = getRoute(form);
        setDelete ? form.action = getRoute(form) + '/' + id + '?_method=DELETE' : undefined;
    }

    function updateForm (form, data) {
        const inputs = form.querySelectorAll('input');
        const select = form.querySelector('select');
        const id = form.querySelector('.id').value;

        if (data) {
            if (birthdate = data['birthdate']) {
                [year, month, day] = birthdate.split('-');
                
                data.day = day;
                data.month = month;
                data.year = year;
            }

            for (input of inputs) {
                data[input.className] ? input.value = data[input.className] : undefined;
                input.className == data.gender ? input.checked = true : undefined;
            }

            if (select) {
                select.value = data[select.className];
            }
            
            form.querySelector('.delete').style.display = 'inline-block';
            changeMethod(form, true, id);
        } else {
            for (input of inputs) {
                input.type == 'radio' ? input.checked = false : input.value = '';
            }

            if (select) {
                select.value = 0;
            }

            form.querySelector('.delete').style.display = 'none';
            changeMethod(form, false);
        }
    }

    userPanel.querySelector('.id').addEventListener('blur', fetchData);
    productPanel.querySelector('.id').addEventListener('blur', fetchData);

    function displayErrors(form, errors) {
        let labels = form.getElementsByClassName('error-msg');

        if (errors) {
            for (label of labels) {
                label.style.gridColumn = 2;
                label.style.display = 'inline-block';
    
                if (errors[label.htmlFor]) {
                    label.innerHTML = errors[label.htmlFor].msg;
                } else if (label.htmlFor == 'birthdate' && errors['day']) {
                    label.innerHTML = errors.day.msg;
                } else {
                    label.innerHTML = '';
                    label.style.display = 'none';
                }
            }
        } else {
            for (label of labels) {
                label.innerHTML = '';
                label.style.display = 'none'
            }
        }
    }

    function submitForm (event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);

        event.submitter.className == 'delete' ? changeMethod(form, undefined, formData.get('id'), true) : undefined;

        fetch(form.action, {
            method: form.method,
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.errors) {
                displayErrors(form, data.errors);
            } else {
                displayErrors(form, undefined);
                updateForm(form, undefined);
            }
            data.id ? console.log(data['id']) : undefined;
            data.product ? window.location.replace("catalog?search=" + data.product) : undefined;
        })
    }

    userPanel.addEventListener('submit', submitForm);
    productPanel.addEventListener('submit', submitForm);
})