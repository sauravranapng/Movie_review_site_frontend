const url=new URL(location.href);
const movieId=url.searchParams.get("id")
const movieTitle=url.searchParams.get("title")
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


const APILINK ='https://movie-review-site-backend.onrender.com/api/v1/';

const main = document.getElementById('section');
const title=document.getElementById('title');

title.innerText=movieTitle;
const div_new = document.createElement('div');
 div_new.setAttribute('class', 'card');
       div_new.innerHTML = `
         
         
           
           New Review
             <p><strong>Review:</strong>
               <input type="text" id="new_review" value="">
             </p>
             
              <p><a href="#" onclick="saveReview('new_review','new_user')"> <i  class="fa fa-save"></i></a></p>
           
         
         
  `
main.appendChild(div_new)
returnReviews(APILINK);

function returnReviews(url) {
  fetch(url +"movie/"+movieId).then(response => response.json()).then(function(data) {
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
         div_card.setAttribute('class', 'card');
          div_card.setAttribute('id', `${review._id}`);
       div_card.innerHTML = `
  
    
        <p><strong>Review: </strong></p><p>${review.review}</p>
        <p><strong>User: </strong>${review.user}</p>
        <p>
          <a class="rev" href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">
            <i class="fas fa-edit"></i> Edit
          </a>
          <a class="rev" href="#" onclick="deleteReview('${review._id}')">
            <i class="fas fa-trash-alt"></i> Delete
          </a>
        </p>
      
   
`;
        main.appendChild(div_card);
      });
    });
}
function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  element.innerHTML = `
    <p><strong>Review:</strong>
    <input type="text" id="${reviewInputId}" value="${review}">
  </p>
    <p><strong>User: </strong>
    <input type="text" id="${userInputId}" value="${user}">
    </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">
    <i class="fa fa-save"></i></a>
    </p>
  `;
}

function saveReview(reviewInputId,userInputId,id=""){
  if(!storedEmail){
      const currentURL = window.location.href;
        const loginURL = `https://website-authentication-server.onrender.com/login?redirect=${encodeURIComponent(currentURL)}`;
         window.location.href = loginURL;
  }
  const review=document.getElementById(reviewInputId).value;
  const user=storedName;
if(id){
  fetch(APILINK+id,{
    method:'PUT',
    headers:{
      
     'Accept':'application/json,text/plain,*/*',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"user":user,"review":review,})//to add data
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      location.reload();//it is going to reload the url
  });
}
  else{
    fetch(APILINK+"new",{
    method:'POST',
    headers:{
      
     'Accept':'application/json,text/plain,*/*',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"user":user,"review":review,"movieId":movieId,"email":storedEmail})//to add data
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      location.reload();//it is going to reload the url
  });
  }
  
}
function deleteReview(id){
  fetch(APILINK+id,{
    method:'DELETE'
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      location.reload();//it is going to reload the url
  });
  }



