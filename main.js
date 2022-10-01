const API_KEY = 'api_key=8fa1e97d3e73fb4c541bc6f6e0044a58';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const movieGrid = document.getElementById("movie-grid");
const form = document.getElementById("search-form");
const searchBar = document.getElementById("search");
const searchIcon = document.getElementById("search-icon");

movieGrid.innerHTML = " ";

function FetchMovies(url) {
    fetch(url)
        .then((response) => {
            return response.json()
            // console.log(response.json());
        })
        .then((data) => {
            console.log(data);
            const totalPages = Math.min(data.total_pages, 5);
            GenerateGrid(url, totalPages);
        })
}

function GenerateGrid(url, data) {
    movieGrid.innerHTML = " ";
    for (var page = 1; page <= data; page++) {
        fetch(url + "&&page=" + page)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                DisplayMovie(data.results);
            })
    }
}


function DisplayMovie(data) {
    data.forEach(movie => {
        const movieTitle = movie.original_title;
        const poster = IMG_URL + movie.poster_path;

        const movieCard = document.createElement('div');
        movieCard.classList.add('w-[244px]', 'h-[360px]', 'max-w-[16rem]', 'min-w-[10rem]', 'drop-shadow-lg',
            'bg-white', 'flex-col', 'items-center', 'mx-5', 'my-4', 'relative', 'bg-contain', 'm-1');

        movieCard.style.backgroundImage = `linear-gradient(to top,rgba(0,0,0, 0.6),rgba(0,0,0,0)), url(${poster})`

        movieCard.innerHTML = `<p class="text-start text-2xl text-white font-medium mt-2 font-sans h-fit absolute bottom-6 left-6 right-6">${movieTitle}</p>`
        movieGrid.appendChild(movieCard);

    });


}

function SearchMovie() {
    const query = searchBar.value;
    FetchMovies(searchURL + '&query=' + query);
}

FetchMovies(API_URL);

searchIcon.addEventListener('click', () => SearchMovie());

form.addEventListener('submit', (event) => {
    event.preventDefault();
    SearchMovie();
});


