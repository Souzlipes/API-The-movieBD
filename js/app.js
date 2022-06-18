const API_KEY = 'api_key=742ed2c046b1c96956ea0acbed82f3cd';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL+ '/discover/movie?sort_by=popularity.desc&' +API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const main_details = document.getElementById('main_details');

getMovies(API_URL);

function getMovies(url){
    fetch(url)
        .then(res => res.json())
        .then(dados => {
            showMovie(dados.results);
        })
}

function showMovie(dados){
    main.innerHTML = '';
    dados.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        let movieIMG = document.createElement('div');
        movieIMG.classList.add('movie');
        movieIMG.classList.add('col-12');
        movieIMG.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h4>${title}</h4>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            
            <div class="overview">
                <h3>Overview<h3>
                <p>${overview}<p>
                <p id="buttonDetails"><button id="details" class"details><a  href="../details.html?iddofilme=${id}">Detalhes</a></button><p>
            </div>
        `
        main.appendChild(movieIMG);
    });
}


function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }

}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchFilm = search.value;

    if(searchFilm){
        getMovies(searchURL+'&query='+searchFilm)
    }
})