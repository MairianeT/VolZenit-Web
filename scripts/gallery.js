const getPhotos = async () => {
    return await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`)
        .then(response => response.json());
}

const container = document.getElementById('album-list');

const loadPhotos = async () => {
    container.innerHTML = '' +
        '<img src="https://cdn.dribbble.com/users/1626465/screenshots/4617986/media/b09265705b58f46795126fa8c0221867.gif" width="300" height="200" alt="mask">';

    const first = Math.floor(Math.random() * 38);
    try {
        const data = (await getPhotos()).slice(first, first + 12);

        container.innerHTML = '';
        for (const item of data) {
            container.innerHTML += `
            <div class="photo__container">
                <img src=${item.url} alt="image preview" class="photo"/>
                <h5 class="photo__title">${item.title}</h5>
            </div>
            `
        }
    } catch (e) {
        container.innerHTML = '<div class="error"><p>Что-то пошло не так...</p></div>';
    }
}

loadPhotos();
