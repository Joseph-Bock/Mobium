window.addEventListener('load', () => {
    const profile = document.querySelector('#profile-panel');
    const id = profile.querySelector('.id').innerHTML;

    const deleteButton = profile.querySelector('.delete');
    const submitButton = profile.querySelector('button');

    deleteButton.style.display = 'inline-block';

    function updateForm (data) {
        if (data) {
            const inputs = profile.querySelectorAll('input');
            const picture = profile.querySelector('.picture');
            const profilePicture = document.querySelector('#profile-picture');

            if (birthdate = data['birthdate']) {
                [year, month, day] = birthdate.split('-');
                
                data.day = day;
                data.month = month;
                data.year = year;
            }

            if (image = data['image']) {
                profilePicture.src = '/img/profileImages/' + image
                picture.style.backgroundImage = 'url("/img/profileImages/' + image + '")';
            } else {
                profilePicture.src = '/img/profileImages/default.png';
                picture.style.backgroundImage = "url('/img/profileImages/default.png')";
            }

            for (input of inputs) {
                data[input.className] ? input.value = data[input.className] : undefined;
                input.className == data.gender ? input.checked = true : undefined;
            }
        }
    }
    
    fetch('users/' + id)
    .then(response => {
        return response.text()
    }).then(data => {
        updateForm(JSON.parse(data).user);
    })

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

    function success (form) {
        submitButton.innerHTML = 'Done!'

        setTimeout(function(){
            submitButton.innerHTML = 'Submit'
        }, 3000);
    }

    function updateUser (event) {
        event.preventDefault();

        const form = event.target.parentElement;
        const formData = new FormData(form);

        fetch('users/' + id + '?_method=PUT', {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.errors) {
                displayErrors(form, data.errors);
            } else {
                displayErrors(form, undefined);
                window.location.replace('/');
                success(form);
            }
        })
    }

    submitButton.addEventListener('click', updateUser);

    function deleteUser (event) {
        event.preventDefault()

        fetch('users/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            window.location.replace('/logout');
            return response.json();
        })
    }

    deleteButton.addEventListener('click', deleteUser);


    //Logout

    const logouts = document.querySelectorAll('.logout');

    function logout () {
        window.location.href = '/logout';
    }

    for (button of logouts) {
        button.addEventListener('click', logout);
    }
})