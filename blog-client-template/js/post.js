window.onload = function() {
    let queryString = location.search;      
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('id'));

    getSpecificPost(urlParams.get('id'));
}

let arrayImg = ["picture.jpg", "css.jpg", "javascript.jpg","html.jpg","git.jpg","api.png","node.png","react.jpg","ux.jpg","vue.png","angular.jpg"];

// Gets the selected post via the ID
async function getSpecificPost(id) {
    try {
        let response = await fetch('http://localhost:5000/posts/' + id);
        let post = await response.json();

        // Loops through the images 
            for (let i of arrayImg) {
              if (i.slice(0, -4) == post.tags[0]){
                element = arrayImg.indexOf(i); 
              }
            }

            let postDate = new Date(post.date);
            let formatedDate = `${postDate.getFullYear()}-${
                postDate.getMonth() + 1
              }-${
                (postDate.getDate() < 10 ? "0" : "") + postDate.getDate()
              } ${postDate.getHours()}:${
                (postDate.getMinutes() < 10 ? "0" : "") + postDate.getMinutes()
              }`;
    let postHTML = "";
    postHTML = `
    <div  id="gridPost">

    <div id="picture">
    <img src = "${arrayImg[element]}" 
    width="100%" height="auto" id="img"> </div>

    <div id = "info">

    <h2>${post.title}</h2>
    <span class="date">Published: ${formatedDate}</span> <br> 
    <span class="author">Author: ${post.author}</span> <br>
    <span class="date">Tags: ${post.tags}</span>

    </div>

    <div id="content">
    <p class="blogPostContent">${post.content}<p>
    <hr>
    </div>

    </div>
    `;

    document.getElementById('post-show').innerHTML = postHTML;
    } catch(error) {
        console.log(error);
    }
}