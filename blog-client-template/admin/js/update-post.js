window.onload = function() {
    let queryString = location.search;       
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('id'));

    getPun(urlParams.get('id'));



    updatePunEvent(urlParams.get('id'))

    
}




async function getPun(id) {
    try {
        let response = await fetch('http://localhost:5000/posts' + id);
        let pun = await response.json();

        document.getElementById('content-textarea').value = pun.content;
    } catch(error) {
        console.log(error);
    }
}



function updatePunEvent(id) {
    let form = document.getElementById('update-Post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formDataObject = {
            "content": formData.get('content')
        }

       

        try {
            await fetch('http://localhost:5000/posts' + id, {
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