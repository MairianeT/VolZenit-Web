const getPhotos = async () => {
    const album_id = Math.floor(Math.random() * 100);
    return await fetch(`https://jsonplaceholder.typicode.com/albums/${album_id}/photos`)
        .then(response => response.json());
}

const container = document.getElementById('album-list');
const template_photos = document.getElementById("photos");
const template_error = document.getElementById("error");

const loadPhotos = async () => {
    container.innerHTML = '' +
        '<img src="https://cdn.dribbble.com/users/1626465/screenshots/4617986/media/b09265705b58f46795126fa8c0221867.gif" width="300" height="200" alt="mask">';

    try {
        const data = (await getPhotos()).slice(1, 12);
        container.innerHTML = '';
        for (const item of data) {
            const photo = template_photos.content.cloneNode(true);
            var img = photo.querySelectorAll("img");
            img[0].src = item.url
            var h5 = photo.querySelectorAll("h5");
            h5[0].textContent = item.title
            container.appendChild(photo);
        }
    } catch (e) {
        const error = template_error.content.cloneNode(true);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(error);
    }
}

loadPhotos();
