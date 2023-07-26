const url=new URL(location.href);
const movieId=url.searchParams.get("id")
const movieTitle=url.searchParams.get("title")
// Access the stored data from localStorage
const storedEmail = localStorage.getItem("userEmail");
const storedName = localStorage.getItem("userName");
// Use the data as needed
console.log("User's email:", storedEmail);
console.log("User's name:", storedName);
const APILINK =`https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=videos,similar,credits`;
const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWI1YTk4NTdhNmQyYjA3YTA2ZmQ3NDkwZWMyNGIwMCIsInN1YiI6IjY0YWJlMDY2ZTI0YjkzMDBhZWUzMTg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HYSivjL_8Sn-CJxZMmX7t5ROtcyax7dXAPN0uhl1dXs';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  };
//const godfather = document.getElementById('godfather');
const main = document.getElementById('box');
const title=document.getElementById('Big_title');
title.innerText=movieTitle;
const para= document.getElementById('p');
const cast_members= document.getElementById('cast_members');
const crew_members=document.getElementById('crew_members');
const style = document.createElement('style');
//it will be added to css
returnDetail(APILINK);
function returnDetail(url) {
  fetch(url, options).then(response => response.json()).then(function(data) {
      console.log(data);

      style.textContent = `
      #godfather::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height:300vh;
        background-image: url(${IMG_PATH + data.backdrop_path});
        background-repeat: no-repeat;

        background-size: 100vw;
        background-position: center top;
        opacity:0.5;     }`;

      // Append the <style> element to the <head> of the document
      document.head.appendChild(style);
      //about Movie
      let no_of_genre=data.genres.length;

      para.innerHTML = `<p>${data.tagline}</p><br><div class="rate"><div class="rating-circle">${data.vote_average.toFixed(1)}</div></div><b>${data.release_date}</b><br>`;
      while(no_of_genre>0){
        para.innerHTML+=`
    <span class="extra-space">
    <a href="#" onclick="redirectToGenreSpecificPage('${data.genres[no_of_genre-1].id}','${data.genres[no_of_genre-1].name}')">${data.genres[no_of_genre-1].name}</a>
    </span>`;
         no_of_genre--;           }

      para.innerHTML+=` <span class="extra-space">${Math.round(data.runtime / 60)}h ${(data.runtime) % 60}min </span>
       <br>${data.overview}<br> <span class="extra-space"><a id="homepage" href="${data.homepage}">MORE</a></span>`;
      //cast and crew
      const cast = data.credits.cast;
      const crew = data.credits.crew;
      const no_of_cast = cast.length;
      const no_of_crew = crew.length;
      let count1;
      count1 = 6;
     
      cast_members.innerHTML = '';
      for (let i = 0; i < count1 && i < no_of_cast; i++) {
        cast_members.innerHTML += `
          <div class="image_card">
            <img id="cast_image" src="${IMG_PATH + cast[i].profile_path}" alt="image2.jpg">
            <h3 class="small_title1">${cast[i].original_name}</h3>
            <h3 class="small_title2">${cast[i].character}</h3>
          </div>`;
      }
      crew_members.innerHTML = '';
      let c = 0;
      let d=0;
      while (c < 2 && d < 15 && d<no_of_crew) {

        if (crew[d].department === "Directing") {
          crew_members.innerHTML += `
            <div class="image_card">
              <img id="cast_image" src="${IMG_PATH + crew[d].profile_path}" alt="image2.jpg">
              <h3 class="small_title1">${crew[d].original_name}</h3>
              <h3 class="small_title2">${crew[d].job}</h3>
            </div>`;
          c++;
        } else if (crew[d].department === "Writing") {
          crew_members.innerHTML += `
            <div class="image_card">
              <img id="cast_image" src="${IMG_PATH + crew[d].profile_path}" alt="image2.jpg">
              <h3 class="small_title1">${crew[d].original_name}</h3>
              <h3 class="small_title2">Writer</h3>
            </div>`;
          c++;
        }
        d++;
      }



      //For Trailors
      const trailor=document.getElementById('trailor');
      const video_data = data.videos.results;
      const slider=document.createElement('div');
      slider.setAttribute('class','video-slider');
      trailor.appendChild(slider);
      let no_of_trailors=video_data.length;
      if(no_of_trailors==0){
        trailor.innerHTML=`<p id="also_like">Trailor is not Awailable</p>`;
      }
      else{
      let cnt=5;
      while(no_of_trailors>0&&cnt>=0){
        const video=document.createElement('div');
        video.setAttribute('class','video-slide');
        video.innerHTML = `<iframe src="https://www.youtube.com/embed/${video_data[no_of_trailors - 1].key}" 
      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
      clipboard-write; encrypted-media;gyroscope; picture-in-picture; 
      web-share" allowfullscreen></iframe>
      `;
      slider.appendChild(video);
        no_of_trailors--;
        cnt--;
      }
      $(document).ready(function() {
        $('.video-slider').slick({
          slidesToShow: 1, // Number of slides to show at a time
          slidesToScroll: 1, // Number of slides to scroll
          autoplay: true, // Set to true for automatic sliding
          autoplaySpeed: 2000 // Delay between slides in milliseconds
        });
      });}
      //for Recommendations
      const no_of_card=data.similar.results.length;

      const movies_data=data.similar.results;

      const card_slider=document.getElementById('slider1');
      let n=0;
      while(n<no_of_card){
        const k=n;
      const  div_card = document.createElement('div');
      div_card.setAttribute('class', 'card');
      const image_container=document.createElement('div');
      image_container.setAttribute('class', 'image_container');
      const image = document.createElement('img');
      image.setAttribute('class', 'thumbnail');
      image.setAttribute('id', 'image');
      image.addEventListener('click', function() {
        window.location.href = `movie_detail.html?id=${movies_data[k].id}&title=${movies_data[k].original_title}`; 
      });
      const bottm = document.createElement('div');
      bottm.setAttribute('class', 'bottm');

      const title2 = document.createElement('h3');
      title2.setAttribute('class', 'title');
      title2.innerHTML = `${movies_data[n].original_title}`;
      title2.addEventListener('click', function() {
        window.location.href = `movie_detail.html?id=${movies_data[k].id}&title=${movies_data[k].original_title}`; // Replace with the desired URL
      });
      const rate = document.createElement('div');
      rate.setAttribute('class', 'rate');
      rate.innerHTML=`<div class="rating-circle">${movies_data[k].vote_average.toFixed(1)}</div>`;
      if(movies_data[k].poster_path){
      image.src = IMG_PATH + movies_data[k].poster_path;
      }
      else{
      image.src = IMG_PATH + movies_data[k].backdrop_path;
      }
     
      image_container.appendChild(image);
      div_card.appendChild(image_container);
      div_card.appendChild(bottm);
      bottm.appendChild(title2);
      bottm.appendChild(rate);
      card_slider.appendChild(div_card);
      
      n++;
      }

      // script.js
      $(document).ready(function() {
        const slider = $('.image-slider');
      
        function setSliderOptions() {
          const screenWidth = window.innerWidth;
          let slidesToShow;
          if (screenWidth < 600) {
            slidesToShow = 1;
          } else if (screenWidth < 950) {
            slidesToShow = 2;
          } else if (screenWidth < 1280) {
            slidesToShow = 3;
          } else {
            slidesToShow = 4; // Default value for larger screens
          }
      
          // Set the Slick slider options dynamically
          slider.slick('slickSetOption', 'slidesToShow', slidesToShow, true);
        }
      
        // Initialize the Slick slider with your desired options
        slider.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          draggable: true,
        });
      
        // Call setSliderOptions on document ready and when the window is resized
        setSliderOptions();
        $(window).on('resize', setSliderOptions);
      });
      
   
  }).catch(error => {
      console.error('Error:', error);
    });
}
function redirectToGenreSpecificPage(genreId,genreName) {
  window.location.href = `index.html?type=genre_specific&genre_id=${genreId}&name=${genreName}`;
}


