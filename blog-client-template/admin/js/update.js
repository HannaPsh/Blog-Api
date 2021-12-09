window.onload = function() {
    let queryString = location.search;      
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('id'));

    getPost(urlParams.get('id'));

    updatePostEvent(urlParams.get('id'))

    
}

jQuery("option").mousedown(function (e) {
    e.preventDefault();
    jQuery(this).toggleClass("selected");

    jQuery(this).prop("selected", !jQuery(this).prop("selected"));
    return false;
  });

async function getPost(id) {
    try {
        let response = await fetch('http://localhost:5000/posts/' + id);
        let post = await response.json();

        document.getElementById('content').value = post.content;

        document.getElementById('title').value = post.title;

        document.getElementById('author').value = post.author;

        document.getElementById('tags').value = post.tags;
        

    } catch(error) {
        console.log(error);
    }
}



function updatePostEvent(id) {
    let form = document.getElementById('update-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formDataObject = {
            "content": formData.get('content'),
            "title": formData.get('title'),
            "author": formData.get('author'),
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
            await fetch('http://localhost:5000/posts/' + id, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject)
            })

            location.replace('index.html');
        } catch(error) {
            console.log(error);
        }
    })

}
