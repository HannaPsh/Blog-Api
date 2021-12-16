window.onload = function() {
    let queryString = location.search;      
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('id'));

    getSpecificPost(urlParams.get('id'));
}

let arrayImg = ["picture.jpg", "css.jpg", "javascript.jpg","html.jpg","git.jpg","api.png","node.png","react.jpg","ux.jpg","vue.png","angular.jpg"];

async function getSpecificPost(id) {
    try {
        let response = await fetch('http://localhost:5000/posts/' + id);
        let post = await response.json();

            for (let i of arrayImg) {
              if (i.slice(0, -4) == post.tags[0]){
                element = arrayImg.indexOf(i); 
              }
            }

let postHTML = "";
    postHTML = `
    <li class="targeted-list" id="parent">
    <div class="targetedPostContainer">
    <div class="postImg"> <img src = "${arrayImg[element]}" 
    width="50%" height="auto" id="img"> </div>
    <div class="targetedListObject"> <h2>${post.title}</h2>
    <span class="date">${post.date}</span> <br> 
    <span class="author">Author: ${post.author}</span>
    <span class="date"><ul class="tagListStyle">${post.tags}</ul></span>
    </div>
    <p class="postContent">${post.content}<p>
    <hr>
    <span class="date"><ul class="tagListStyle">${post.tags}</ul></span></div></li>
    `;

    document.getElementById('post-show').innerHTML = postHTML;
    } catch(error) {
        console.log(error);
    }
}