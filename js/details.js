const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" i
let id = params.iddofilme;

const API_KEY = '?api_key=742ed2c046b1c96956ea0acbed82f3cd';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_VIDEO = BASE_URL +'/movie/'+id+'/videos'+API_KEY+'&language=en-US';
const URL_DETAILS = BASE_URL +'/movie/'+ id + API_KEY+'&language=en-US';
//api.themoviedb.org/3/movie/${id}/videos?${API_KEY}&language=pt-BR&region=BR
//api.themoviedb.org/3/movie/{movie_id}?api_key=&language=en-US

const main_details = document.getElementById('main_details');
const text_details = document.getElementById('text_details');

getVideos(URL_VIDEO);
getDetails(URL_DETAILS);

function getVideos(url){
    let video = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.results.length != 0){
                var src = `https://www.youtube.com/embed/${data.results[0].key}`
                video +=`
                <div class="conteudo_filme col-12">
                    <iframe id="iframe" src="${src}" frameborder="0" allow="autoplay"></iframe>
                    
                </div>
                `
                
            }else{
                console.log("Sem video");
            }
            main_details.innerHTML=video;
        });
}

function getDetails(url){
    let texto = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
                texto =`
                <p>${data.overview}</p>
            `;
                
            text_details.innerHTML = texto;
        });
}

document.querySelector('p.teste').style.color ='green';