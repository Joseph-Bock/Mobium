window.addEventListener('load', () => {
    const profile = document.querySelector('#profile-panel');

    if (profile) {
        var userId = profile.querySelector('.id').innerHTML;
    }

    const container = document.querySelector('#products');
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('search');

    if (isNaN(parseInt(myParam))) {
        fetch('products?search=' + myParam)
        .then(response => {
            return response.json();
        }).then(data => {
            displayProducts(data.products);
        })
    } else {
        fetch('products')
        .then(response => {
            return response.json();
        }).then(data => {
            displayProducts(data.products);
        })
        
    }

    const search = document.querySelector('#search-bar');

    function searchProduct (event) {
        event.preventDefault();

        const query = search.querySelector('input').value;
        
        fetch('products?search=' + query)
        .then(response => {
            return response.json();
        }).then(data => {
            clearProducts();
            displayProducts(data.products);
        })
    }

    search.addEventListener('submit', searchProduct);

    function clearProducts () {
        container.innerHTML = '';
    }
    
    function updateProduct (data) {
        const panel = document.querySelector('#product-panel');
        const fields = panel.querySelectorAll('p');
        const image = panel.querySelector('.picture');

        panel.querySelector('h1').innerText = data.name;
        panel.querySelector('h3').innerText = data.price + '$';

        if (data.image) {
            image.style.backgroundImage = 'url("/img/productImages/' + data.image + '")';
        }

        for (field of fields) {
            const name = field.innerHTML.split('<')[0];

            if (value = data[field.className]) {
                if (typeof value == 'number') {
                    if (field.className == 'weight') {
                        field.innerHTML = name + '<span>' + value + ' Grams' + '</span>';
                    } else if (field.className == 'display') {
                        field.innerHTML = name + '<span>' + value + ' Inch' + '</span>';
                    } else if (field.className == 'frontCamera' || field.className == 'backCamera') {
                        field.innerHTML = name + '<span>' + value + ' MP' + '</span>';
                    } else {
                        field.innerHTML = name + '<span>' + value + ' GB' + '</span>';
                    }
                } else {
                    field.innerHTML = name + '<span>' + value + '</span>';
                }
            }
        }
    }

    function productDetails (event) {
        for (elem of event.path) {
            elem.className == 'product' ? product = elem : undefined;
        }

        const id = product.querySelector('.id').innerHTML;

        fetch('products/' + id)
        .then(response => {
            return response.json()
        }).then(data => {
            updateProduct(data.product);
        })
    }
    
    function displayProducts (products) {
        
        if (userId) {
            if (userId == 1) {
                fetch('users/' + userId)
                .then(response => {
                    return response.text()
                }).then(data => {
                    render(JSON.parse(data).user.admin)
                })
            }
        } else {
            render();
        }

        function render (admin) {
            products.forEach(product => {
                const divContainer = document.createElement('div');
                divContainer.classList.add('product');
    
                const id = document.createElement('p');
                id.classList.add('id');
                id.innerHTML = product.id;
                id.style.display = 'none';
                divContainer.appendChild(id);

                if (admin == 1) {
                    const adminButton = document.createElement('div');
                    adminButton.classList.add('edit-product');
                    divContainer.appendChild(adminButton);
                }
                
                if (product.discount > 0) {
                    const discount = document.createElement('p')
                    discount.classList.add('discount-tag');
                    discount.innerHTML = '-' + product.discount + '%';
                    divContainer.appendChild(discount);
                }

                const name = document.createElement('p');
                name.innerHTML = product.name;
                divContainer.appendChild(name);
    
                const image = document.createElement('img');
                image.src = 'img/productImages/' + product.image;
                divContainer.appendChild(image);
    
                const addCart = document.createElement('div');
                addCart.classList.add('cart-shortcut');
                divContainer.appendChild(addCart);
    
                const price = document.createElement('p');

                if (product.discount > 0) {
                    price.innerHTML = (product.price * (product.discount / 100)) + '$';
                } else {
                    price.innerHTML = product.price + '$';
                }

                addCart.appendChild(price);
    
                const add = document.createElement('button');
                add.classList.add('button');
                addCart.appendChild(add);
    
                container.appendChild(divContainer);
    
                divContainer.addEventListener('click', productDetails);
            })
        }
    }
})