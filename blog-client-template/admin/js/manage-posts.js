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
            postsHTML += `<tr><td>${post.title}</td>
            <td>${post.author}</td> <td>${post.tags}</td> <td>${formatedDate}</td> <td> <a href="update-post.html?id=${post['_id']}">Update</a> |
            <a class="delete-link" data-id="${post['_id']}" href="#">Delete</a> </td></tr>`;

        }

        document.getElementById('tBody').innerHTML = postsHTML;
    } catch(error) {
        console.log(error);
    }

    deletePunEvent();
}


function deletePunEvent() {
    let deleteLinks = document.getElementsByClassName('delete-link');
    console.log(deleteLinks);

    for (let link of deleteLinks) {
        link.addEventListener('click', async function(e) {
            e.preventDefault();

            // console.log(e.target.dataset.id);

            try {
                await fetch('http://localhost:5000/post/' + e.target.dataset.id,
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




