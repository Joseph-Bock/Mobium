window.addEventListener('load', () => {
    const arrow = document.querySelector('#arrow');
    const featured = document.querySelector('h1');

    function goDown () {
        const position = featured.offsetTop;
        const offset = document.querySelector('nav').offsetHeight;

        window.scrollTo({
            top: position - offset,
            behavior: 'smooth'
        })
    }

    arrow.addEventListener('click', goDown);

    const searchBar = document.querySelector('#search-bar');

    function openCatalog (event) {
        event.preventDefault();

        const input = event.target.querySelector('input');
        window.location.href = 'catalog?search=' + input.value;
    }

    searchBar.addEventListener('submit', openCatalog);
})