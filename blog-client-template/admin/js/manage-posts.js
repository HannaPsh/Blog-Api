window.onload = function() {
    fetchAllPosts();
}

// Gets all the posts with the API
async function fetchAllPosts() {
    try {
        let response = await fetch('http://localhost:5000/posts');
        let posts = await response.json();
        console.log(posts);
        
        let postsHTML = '';
        
        // Loops through all posts to get specific parts (author, title, tags etc)
        for(let post of posts) {
            let postDate = new Date(post.date);
            let formatedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1}-${(postDate.getDate()<10?'0':'') + postDate.getDate()} ${postDate.getHours()}:${(postDate.getMinutes()<10?'0':'') + postDate.getMinutes()}`
   
            console.log(post.tags);
            console.log(post['_id'])

            postsHTML += `<tr><td>${post.title}</td>
            <td>${post.author}</td> <td>${post.tags}</td> <td>${formatedDate}</td> <td> <a href="update.html?id=${post._id}">Update</a> |
            <a class="delete-link" data-id="${post['_id']}" href="#">Delete</a> </td></tr>`;

        } 
        
        document.getElementById('tBody').innerHTML = postsHTML;
    } catch(error) {
        console.log(error);
    }

    deletePost();
}

// Delets the targeted post
function deletePost() {
    let deletePosts = document.getElementsByClassName('delete-link');
    
    // Loops through the blogposts and finds the targeted one with (e)
    for (let link of deletePosts) {
        link.addEventListener('click', async function(e) {
            e.preventDefault();

            console.log(e.target.dataset.id);

            // Removes the targeted blogpost with the DELETE method + Blogpost ID
            try {
                await fetch('http://localhost:5000/posts/' + e.target.dataset.id,
                    {
                        method: 'DELETE'
                    }
                );

                e.target.parentNode.parentNode.remove();
            } catch(error) {
                console.log(error)
            }
            
        })
    }
}




