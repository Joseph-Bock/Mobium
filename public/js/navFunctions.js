window.addEventListener('load', () => {
    //Blur background

    const blur = document.querySelector('#back-blur');
    let blurred = false;
    let count = 0

    function blurBackground (bool) {
        if (bool) {
            count++
        } else {
            count--
        }

        console.log(count);

        if (count == 1 && !blurred) {
            document.querySelector('html').style.overflowY = 'hidden';
            blur.style.opacity = 1;
            blur.style.top = 'unset';
            blurred = true;
        } else if (count == 0 && blurred) {
            document.querySelector('html').style.overflowY = 'scroll';
            blur.style.opacity = 0;
            blurred = false
        }
    }

    function closePanels () {
        const logP = document.querySelector('.login-form');
        const profP = document.querySelector('#profile-panel');
        const adminP = document.querySelector('#admin-panel');
        const productP = document.querySelector('#product-panel');
        const deletePrompt = document.querySelector('#logout-prompt');

        if (deletePrompt) {
            deletePrompt.style.top = '-50%';
        }
        
        if (logP && loginOpened) {
            openLogin();
        }

        if (profP && profileOpened) {
            openProfile();
        }

        if (adminP && adminOpened) {
            openAdmin();
        }

        if (productP && productOpened) {
            openProduct();
        }
    }

    blur.addEventListener('click', closePanels);


    //Open Mobile Nav

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


    //Open Login

    const loginPanel = document.querySelector('.login-form');
    const loginButton = document.querySelector('#login');
    let loginTransitioning = false;
    let loginOpened = false;

    if (loginPanel) {
        let offset = document.querySelector('nav').offsetHeight / 2;
        let position = loginPanel.offsetTop;
        let center = (window.innerHeight / 2) + offset;

        if (center - position <= 0.5) {
            loginOpened = true;
            blurBackground(true);
        }

        function openLogin () {
            if (!loginTransitioning) {
                let offset = document.querySelector('nav').offsetHeight;
    
                if (!loginOpened) {
                    blurBackground(true);
                    loginPanel.style.top = 'calc(50% + ' + (offset / 2) + 'px)';
                } else {
                    blurBackground(false);
                    loginPanel.style.top = '-100%';
                }
            }
        }
    
        loginPanel.ontransitionrun = (event) => {
            if (event.target == loginPanel) {
                loginTransitioning = true;
            }
        };
    
        loginPanel.ontransitionend = () => {
            if (count == 0) {
                blur.style.top = '-100%';
            }
    
            loginOpened = !loginOpened;
            loginTransitioning = false;
        };
    
        hamLogin.addEventListener('click', openLogin)
        loginButton.addEventListener('click', openLogin)
    }


    //Open Profile

    const profilePanel = document.querySelector('#profile-panel');
    const profile = document.querySelector('#profile-picture');

    let profileTransitioning = false;
    let profileOpened = false;

    if (profile) {
        const picture = profilePanel.querySelector('.picture');
        const fileInput = profilePanel.querySelector('.fileButton');

        fileInput.style.display = 'none';
        
        function uploadFile () {
            fileInput.click();
        }

        picture.addEventListener('click', uploadFile);

        function openProfile () {
            if (!profileTransitioning) {
                let offset = document.querySelector('nav').offsetHeight;
    
                if (!profileOpened) {
                    blurBackground(true);
                    profilePanel.style.top = 'calc(50% + ' + (offset / 2) + 'px)';
                } else {
                    blurBackground(false);
                    profilePanel.style.top = '-100%';
                }
            }
        }

        profilePanel.ontransitionrun = (event) => {
            if (event.target == profilePanel) {
                profileTransitioning = true;
            }
        };
    
        profilePanel.ontransitionend = () => {
            if (count == 0) {
                blur.style.top = '-100%';
            }
    
            profileOpened = !profileOpened;
            profileTransitioning = false;
        };

        profile.addEventListener('click', openProfile);
    }


    //Open Product Panel

    const productPanel = document.querySelector('#product-panel');
    let productTransitioning = false;
    let productOpened = false;

    if (productPanel) {
        let offset = document.querySelector('nav').offsetHeight / 2;
        let position = productPanel.offsetTop;
        let center = (window.innerHeight / 2) + offset;

        if (center - position <= 0.5) {
            productOpened = true;
            blurBackground(true);
        }
        
        function openProduct () {
            if (!productTransitioning) {
                let offset = document.querySelector('nav').offsetHeight;
    
                if (!productOpened) {
                    blurBackground(true);
                    productPanel.style.top = 'calc(50% + ' + (offset / 2) + 'px)';
                } else {
                    blurBackground(false);
                    productPanel.style.top = '-100%';
                }
            }
        }

        productPanel.ontransitionrun = (event) => {
            if (event.target == productPanel) {
                productTransitioning = true;
            }
        };
    
        productPanel.ontransitionend = () => {
            if (count == 0) {
                blur.style.top = '-100%';
            }
    
            productOpened = !productOpened;
            productTransitioning = false;
        };

        const config = { attributes: true, childList: true, subtree: true };
        let canOpen = true;

        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                if (mutation.type === 'childList' && canOpen) {
                    canOpen = false;
                    openProduct();

                    setTimeout(function(){
                        canOpen = true;
                    }, 1000);
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(productPanel, config);

    }

    //Open Admin Panel

    const adminPanel = document.querySelector('#admin-panel');
    let adminTransitioning = false;
    let adminOpened = false;

    if (adminPanel) {
        function openAdmin () {
            if (!adminTransitioning) {
                let offset = document.querySelector('nav').offsetHeight;
    
                if (!adminOpened) {
                    blurBackground(true);
                    adminPanel.style.top = 'calc(50% + ' + (offset / 2) + 'px)';
                } else {
                    blurBackground(false);
                    adminPanel.style.top = '-100%';
                }
            }
        }
    
        adminPanel.ontransitionrun = (event) => {
            if (event.target == adminPanel) {
                adminTransitioning = true;
            }
        };
    
        adminPanel.ontransitionend = () => {
            if (count == 0) {
                blur.style.top = '-100%';
            }
    
            adminOpened = !adminOpened;
            adminTransitioning = false;
        };
    
        window.addEventListener('keydown', (event) => {
            let key = event.key;
    
            if (key == '=') {
                openAdmin();
            }
        });
    }

    const editButtons = document.getElementsByClassName('edit-product');
    
    function editProduct (event) {
        event.stopPropagation();

        const productForm = document.querySelector('#product-admin').querySelector('.id');
        const productButton = document.querySelector('#product-button')
        const id = event.target.parentElement.querySelector('.id').innerText;

        const trigger = new Event('change', { 'bubbles': true, 'cancelable': true });
        const changeForm = new Event('click', { 'bubbles': true, 'cancelable': true });

        productForm.value = id;
        productForm.dispatchEvent(trigger);
        productButton.dispatchEvent(changeForm);
        openAdmin();
    }

    setTimeout(function(){
        for (let button of editButtons) {
            button.addEventListener('click', editProduct);
        }
    }, 100);
})