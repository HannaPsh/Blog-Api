window.onload = function() {
    submitBlogPost();
}

// Alouds the user to choose several options withput pressing CTRL
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
        
        // Gets the userinput from the form and creates an object
        let blogContent = new FormData(blogPost);
        let blogContentObject = {
            "title"  : blogContent.get('title'),
            "content": blogContent.get('content'),
            "author" : blogContent.get('author'),
            "tags"   : getTags()
        }

        // Creates an array to collect if the user chooses more then one tag, in order to write put all the tags in the post
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
        
        // Sends the form with the API
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


  