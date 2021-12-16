window.onload = function () {
  fetchAllPuns();
};

let arrayImg = ["picture.jpg", "css.jpg", "javascript.jpg","html.jpg","git.jpg","api.png","node.png","react.jpg","ux.jpg","vue.png","angular.jpg"];

async function fetchAllPuns() {
  try {
    let response = await fetch("http://localhost:5000/posts");
    let posts = await response.json();
    let element;
    let postsHTML = "";

    for (let post of posts) {

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

      let allTags = "";

      for (let tag of post.tags) {
        allTags += `
        <li class="tagStyle">${tag}</li>
        `;
     }
      console.log(post["_id"]);
      postsHTML += `
                <li class="list-group-item" id="parent">
                <div id="leftSide"> <img src = "${arrayImg[element]}" 
                width="100%" height="auto" id="img"> </div>
                   <div id="rightSide"> <h2>${post.title}</h2> 
                   <span class="date">${formatedDate}</span> <br> 
                   <span class="author">Author: ${post.author}</span>
                    <p>${post.content.slice(0,100)}<br><a href="post.html?id=${post._id}">Read More</a></p>
                    <hr>
                    <span class="date"><ul class="tagListStyle">${allTags}</ul></span></div></li>
                    `;
                    
    }
    document.getElementById("post-list").innerHTML = postsHTML;
  } catch (error) {
    console.log(error);
  }
}
