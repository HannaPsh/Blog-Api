window.onload = function() {
    submitBlogPost();
}

jQuery("option").mousedown(function (e) {
    e.preventDefault();
    jQuery(this).toggleClass("selected");
  
    jQuery(this).prop("selected", !jQuery(this).prop("selected"));
    return false;
  });


function submitBlogPost() {
    let blogPost = document.getElementById('create-blog-post');

    blogPost.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let blogContent = new FormData(blogPost);
        let blogContentObject = {
            "title"  : blogContent.get('title'),
            "content": blogContent.get('content'),
            "author" : blogContent.get('author'),
            "tags"   : getTags()
        }

        function getTags() {
            var selected = [];
            for (var option of document.getElementById('tags').options)
            {
                if (option.selected) {
                    selected.push(option.value);
                }
            }
            return selected;
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


  