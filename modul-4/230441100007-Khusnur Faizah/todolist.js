const taskNotification = document.querySelector(".task-notification");
const finishNotification = document.querySelector(".finish-notification");
const listContainer = document.querySelector(".list-container");
const input = document.querySelector(".input-list");
const inputSubmit = document.querySelector(".button-input-submit");
const KEY = "TODOLIST";

let storeData = [];

// Event listener untuk tombol submit
inputSubmit.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        storeData.push({ id: Date.now(), text: input.value.trim(), finish: false });
        input.value = "";
        saveData();
        render();
    }
});

function render() {
    removeListElements();
    let finish = 0;
    let task = 0;

    storeData.forEach((data) => {
        data.finish ? finish++ : task++;

        const listItem = document.createElement("div");
        const text = document.createElement("div");
        const iconDelete = document.createElement("i");
        const iconEdit = document.createElement("i");

        iconDelete.onclick = () => deleteList(data.id);
        iconEdit.onclick = () => editList(data.id, text);

        listItem.className = "list-item";
        text.className = "list-text";
        text.innerHTML = data.text;
        iconDelete.className = "fas fa-trash-alt delete-list";
        iconEdit.className = "fas fa-edit edit-list";

        if (data.finish) {
            listItem.style.background = "var(--primary)";
            listItem.style.color = "white";
            text.style.color = "white";
        }

        listItem.appendChild(text);
        listItem.appendChild(iconEdit);
        listItem.appendChild(iconDelete);
        listContainer.appendChild(listItem);

        listItem.onclick = () => {
            if (data.finish === false) {
                data.finish = true;
                listItem.style.background = "var(--primary)";
                listItem.style.color = "white";
                text.style.color = "white";
            } else {
                data.finish = false;
                listItem.style.background = "white";
                listItem.style.color = "gray";
                text.style.color = "gray";
            }
            saveData();
        };
    });

    finishNotification.innerHTML = `Selesai ${finish}`;
    taskNotification.innerHTML = `Tugas ${task}`;
}

function removeListElements() {
    while (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.firstChild);
    }
}

function deleteList(id) {
    storeData = storeData.filter(data => data.id !== id);
    saveData();
    render();
}

function editList(id, textElement) {
    const newText = prompt("Edit tugas:", textElement.innerHTML);
    if (newText !== null && newText.trim() !== "") {
        const index = storeData.findIndex(data => data.id === id);
        storeData[index].text = newText.trim();
        saveData();
        render();
    }
}

function saveData() {
    localStorage.setItem(KEY, JSON.stringify(storeData));
}

function getData() {
    const data = localStorage.getItem(KEY);
    if (data) {
        storeData = JSON.parse(data);
    }
}

getData();
render();
