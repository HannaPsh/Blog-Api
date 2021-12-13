window.onload = function () {
  fetchAllPuns();
};

let arrayImg = ["4375581.jpg", "6584451.jpg", "6060285.png", "6584600.jpg"];

async function fetchAllPuns() {
  try {
    let response = await fetch("http://localhost:5000/posts");
    let posts = await response.json();
    console.log(posts);
    let element = -1;
    let postsHTML = "";
    for (let post of posts) {
    
      if (element < arrayImg.length-1) {
        element++;
        console.log(element);
      } 
      else{
        element = 0;
      }
      let postDate = new Date(post.date);
      let formatedDate = `${postDate.getFullYear()}-${
        postDate.getMonth() + 1
      }-${
        (postDate.getDate() < 10 ? "0" : "") + postDate.getDate()
      } ${postDate.getHours()}:${
        (postDate.getMinutes() < 10 ? "0" : "") + postDate.getMinutes()
      }`;

      console.log(post["_id"]);

      postsHTML += `
                <li class="list-group-item" id="parent">
                <div id="leftSide"> <img src = "${arrayImg[element]}" width="100%" height="70%" id="img"> </div>
                   <div id="rightSide"> <h2>${post.title}</h2> <span class="date">${formatedDate}</span> <br> <span class="author">Author: ${post.author}</span>

                    <p>${post.content}</p>
                    <hr>
                    <span class="date"><p>${post.tags.join(' ')}</p></span></div></li>
                    `;
    
      document.getElementById("post-list").innerHTML = postsHTML;
   
  }
  } catch (error) {
    console.log(error);
  }
}
