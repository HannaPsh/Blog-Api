window.onload = function() {
    submitBlogPost();
}

function submitBlogPost() {
    let blogPost = document.getElementById('create-blog-post');

    blogPost.addEventListener('submit', async function(e) {
        e.preventDefault();

        let blogContent = new FormData(blogPost);
        let blogContentObject = {
            "title"  : blogContent.get('title'),
            "content": blogContent.get('content'),
            "image"  : blogContent.get('image'),
            "author" : blogContent.get('author'),
            "tags"   : blogContent.get('tags')
        }

        try {
            await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogContentObject),
            })
            console.log(blogContentObject);
            location.replace('index.html');
        } catch(error) {
            console.log(error);
        }
    });
}