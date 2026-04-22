document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(Response => Response.text ())
        .then(data => {
            document.querySelector('#header').innerHTML = data;
        })
        .catch(error => console.error('Error Loading header', error));
        
    fetch('footer.html')
        .then(Response => Response.text ())
        .then(data => {
            document.querySelector('#footer').innerHTML = data;
        })
        .catch(error => console.error('Error Loading footer', error));
    });