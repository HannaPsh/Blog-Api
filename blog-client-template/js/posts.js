window.onload = function() {
    fetchAllPuns();
}

async function fetchAllPuns() {
    try {
        let response = await fetch('http://localhost:5000/posts');
        let posts = await response.json();
        console.log(posts);

        let postsHTML = '';
        for(let post of posts) {
            let postDate = new Date(post.date);
            let formatedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}`

            console.log(post['_id'])
            postsHTML += `
                <li class="list-group-item">
                    <p>${post.title} <br> <span class="date">- ${formatedDate}</span> <br> <span class="date">${post.tags}</span><br>
                    
                    </p>
                    <p>${post.content}</p>

                </li>
            `;
        }

        document.getElementById('post-list').innerHTML = postsHTML;
    } catch(error) {
        console.log(error);
    }

}





