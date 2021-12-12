window.onload = function () {
  fetchAllPuns();
};

async function fetchAllPuns() {
  try {
    let response = await fetch("http://localhost:5000/posts");
    let posts = await response.json();
    console.log(posts);

    let postsHTML = "";
    for (let post of posts) {
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
                <li class="list-group-item">
                    <h2>${post.title}</h2> <span class="date">${formatedDate}</span> <br> <span class="author">Author: ${post.author}</span>
                    
                    <p>${post.content}</p>
<p id="underline">_______________________________</p>
                    <span class="date">Tags: ${post.tags}</span>

                </li>
            `;
    }

    document.getElementById("post-list").innerHTML = postsHTML;
  } catch (error) {
    console.log(error);
  }
}
