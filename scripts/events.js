const form = document.querySelector('#events-form');
const dataContainer = document.querySelector('#events-list');

const addTaskToMarkup = (task) => {
    const markup = `
    <div class="events_item" id="${new Date().getTime()}">
      <span class="events_item_body">
        <h5 class="events_item_header">${task.date}</h5>
        <p class="events_item_text">${task.text}</p>
      </span>
      <span class="events_btn_delete">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="35" height="35"
viewBox="0 0 128 128">
<path fill="#fff" d="M84,124H44c-11.05,0-20-8.95-20-20V38h80v66C104,115.05,95.05,124,84,124z"></path><path fill="#fff" d="M104,38H24c-5.52,0-10-4.48-10-10v0c0-5.52,4.48-10,10-10h80c5.52,0,10,4.48,10,10v0 C114,33.52,109.52,38,104,38z"></path><path fill="#444b54" d="M117,28c0-7.17-5.83-13-13-13H24c-7.17,0-13,5.83-13,13s5.83,13,13,13h77v63c0,9.37-7.63,17-17,17H44 c-9.37,0-17-7.63-17-17V52c0-1.66-1.34-3-3-3s-3,1.34-3,3v52c0,12.68,10.32,23,23,23h40c12.68,0,23-10.32,23-23V40.64 C112.72,39.28,117,34.13,117,28z M104,35H24c-3.86,0-7-3.14-7-7s3.14-7,7-7h80c3.86,0,7,3.14,7,7S107.86,35,104,35z"></path><path fill="#444b54" d="M79,7H49c-1.66,0-3-1.34-3-3s1.34-3,3-3h30c1.66,0,3,1.34,3,3S80.66,7,79,7z"></path><path fill="#71c2ff" d="M50,107c-1.66,0-3-1.34-3-3V58c0-1.66,1.34-3,3-3s3,1.34,3,3v46C53,105.66,51.66,107,50,107z"></path><path fill="#71c2ff" d="M78,107c-1.66,0-3-1.34-3-3V58c0-1.66,1.34-3,3-3s3,1.34,3,3v46C81,105.66,79.66,107,78,107z"></path>
</svg>
      </span>
    </div>
  `;
    dataContainer.insertAdjacentHTML('beforeend', markup);
}

const deleteItem = (item) => {
    const values = JSON.parse(localStorage.getItem('event'));
    const filteredValues = values.filter((value) => value.id !== item.id);
    localStorage.setItem('event', JSON.stringify(filteredValues));
    item.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('event')) {
        const event = JSON.parse(localStorage.getItem('event'));
        event.forEach((task) => {
            addTaskToMarkup(task);
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.events_btn_delete')) {
            const item = e.target.closest('.events_item');
            deleteItem(item);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        if (!values.text) {
            alert('Название события не указано');
            return;
        }
        addTaskToMarkup(values);
    });

    dataContainer.addEventListener('DOMSubtreeModified', () => {
        const items = document.querySelectorAll('.events_item');

        let values = [];
        items.forEach((item) => {
            const date = item.getElementsByClassName('events_item_header')[0].innerText;
            const text = item.getElementsByClassName('events_item_text')[0].innerText;
            const id = item.id;

            values.push({ date, text, id });
        });

        localStorage.setItem('event', JSON.stringify(values));
    })
})