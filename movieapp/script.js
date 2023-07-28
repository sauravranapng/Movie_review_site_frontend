const url=new URL(location.href);
const type=url.searchParams.get("type");
function getQueryParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}
const userEmail = getQueryParam("email");
const userName = getQueryParam("name");
if(userEmail&&userName){
  localStorage.setItem("userEmail", userEmail);
localStorage.setItem("userName", userName);
}
// Access the stored data from localStorage
const storedEmail = localStorage.getItem("userEmail");
const storedName = localStorage.getItem("userName");

// Use the data as needed
console.log("User's email:", storedEmail);
console.log("User's name:", storedName);

let APILINK;
if(!type||type==="normal"){
  
  APILINK ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
}

else if(type==="top_rated"){
   APILINK='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
}
else if(type==="genre_specific"){
  let  genreId=url.searchParams.get("genre_id");
/*let genreName=url.searchParams.get("name");*/
APILINK=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`;
}

const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWI1YTk4NTdhNmQyYjA3YTA2ZmQ3NDkwZWMyNGIwMCIsInN1YiI6IjY0YWJlMDY2ZTI0YjkzMDBhZWUzMTg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HYSivjL_8Sn-CJxZMmX7t5ROtcyax7dXAPN0uhl1dXs';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?query=';
const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${access_token}`
  }
};
returnMovies(APILINK);

function returnMovies(url) {
  fetch(url, options).then(response => response.json()).then(function(data) {
      console.log(data.results);
      data.results.forEach(element => {
        //const div_row = document.createElement('div');
        //div_row.setAttribute('class', 'row');
       // const div_column = document.createElement('div');
        //div_column.setAttribute('class', 'column');
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
        image.addEventListener('click', function() {
          window.location.href = `movie_detail.html?id=${element.id}&title=${element.original_title}`; // Replace with the desired URL
        });
        const bottm = document.createElement('div');
        bottm.setAttribute('class', 'bottm');

        const title = document.createElement('h3');
        title.setAttribute('class', 'title');
        title.innerHTML = `${element.original_title}`;
        title.addEventListener('click', function() {
          window.location.href = `movie_detail.html?id=${element.id}&title=${element.original_title}`; // Replace with the desired URL
        });
        const rate = document.createElement('div');
        rate.setAttribute('class', 'rate');
        rate.innerHTML=`<div class="rating-circle">${element.vote_average.toFixed(1)}</div><a id="review_link"  onclick="goTo('${element.id}','${element.original_title}')">Reviews</a>`;
        if(element.poster_path){
        image.src = IMG_PATH + element.poster_path;
        }
        else{
        image.src = IMG_PATH + element.backdrop_path;
        }
        div_card.appendChild(image);
        div_card.appendChild(bottm);
        bottm.appendChild(title);
        bottm.appendChild(rate);
        main.appendChild(div_card);
        //div_row.appendChild(div_column);
        //main.appendChild(div_row);
      });
    
    
    const dropdown = document.querySelector('.dropdown');
const nav = document.querySelector('.container nav');
const label=document.querySelector('.container label');
// Add event listener for mouseover and mouseout

// Get the elements


// Add event listener for mouseover and mouseout
dropdown.addEventListener('mouseover', () => {
  // Increase the height of .nav when hovering over .dropdown
  nav.style.height = '1150px';
});

dropdown.addEventListener('mouseout', () => {
  // Reset the height of .nav when the mouse leaves .dropdown
  nav.style.height = '300px'; // Change this to the initial height value
});


});
}
function goTo(movieId,movietitle) {
  window.location.href = `movie.html?id=${movieId}&title=${movietitle}`;
}




form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';
  const searchItem = search.value;
  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});
