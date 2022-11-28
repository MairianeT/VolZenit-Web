const form = document.getElementById("events-form");
const dataContainer = document.getElementById("events-list");
const template = document.getElementById("template");
const data = JSON.parse(localStorage.getItem('event'));

const addTaskToMarkup = (task) => {
    const item = template.content.cloneNode(true);
    var h5 = item.querySelectorAll("h5");
    h5[0].textContent = task.date
    var p = item.querySelectorAll("p");
    p[0].textContent = task.text
    var div = item.querySelectorAll("div");
    div[0].id = crypto.randomUUID()
    dataContainer.appendChild(item);
}

const addTaskToList = (task) => {
    const item = template.content.cloneNode(true);
    var h5 = item.querySelectorAll("h5");
    h5[0].textContent = task.date
    var p = item.querySelectorAll("p");
    p[0].textContent = task.text
    var div = item.querySelectorAll("div");
    div[0].id = task.id;
    dataContainer.appendChild(item);
}

const deleteItem = (item) => {
    const values = JSON.parse(localStorage.getItem('event'));
    const filteredValues = values.filter((value) => value.id !== item.id);
    localStorage.setItem('event', JSON.stringify(filteredValues));
    item.remove();
}

const btn = document.getElementById("delete-btn")

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('event')) {
        const event = JSON.parse(localStorage.getItem('event'));
        event.forEach((task) => {
            addTaskToList(task);
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
        addTaskToMarkup(values);
        form.reset();
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