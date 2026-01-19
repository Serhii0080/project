const model = {
    notes: [],

    createNotes(inputValue, textareaValue, colorInput) {
        const note = {};
        note.title = inputValue;
        note.description = textareaValue;
        note.id = new Date().getTime();
        note.color = colorInput;
        note.isFavorite = false;
        this.notes.push(note);
        view.renderNotes(this.notes);
    },
};

const view = {
    init() {
        const form = document.querySelector(".note-form");
        const button = document.querySelector(".main-button");
        const input = document.querySelector(".name-noties");
        const textarea = document.querySelector(".note-description");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValue = input.value;
            const textareaValue = textarea.value;
            const checked = document.querySelector(
                'input[name="color"]:checked'
            );
            let colorInput;

            if (button) {
                switch (checked.id) {
                    case "color-yellow":
                        colorInput = "yellow";
                        break;
                    case "color-green":
                        colorInput = "green";
                        break;
                    case "color-blue":
                        colorInput = "blue";
                        break;
                    case "color-red":
                        colorInput = "red";
                        break;
                    case "color-purple":
                        colorInput = "purple";
                        break;

                    default:
                        // Здесь можно задать цвет по умолчанию, если понадобится!
                        break;
                }

                controller.addNote(inputValue, textareaValue, colorInput);
            }
        });
    },

    renderNotes(noties) {
        const notesList = document.querySelector(".notes-list");
        const filterBox = document.querySelector(".filter-box");
        notesList.innerHTML = "";
        filterBox.innerHTML = "";
        filterBox.style.marginTop = "0";
        filterBox.innerHTML = `<label class="filterCheckbox">
    <input type="checkbox" />Показать только избранные заметки
</label>`;

        noties.forEach((element) => {
            const li = document.createElement("li");
            li.classList.add("addList");
            li.innerHTML = `
                <header class="headerNot">
                <h1>
                ${element.title}
                <span class="group">
                    <span class="favorite-false"></span>
                    <span class="delete-false"></span>
                </span>
                </h1>
                </header>
                <p>${element.description}</p>`;
            li.firstElementChild.classList.add(element.color);
            notesList.append(li);
        });
    },
};

const controller = {
    addNote(inputValue, textareaValue, colorInput) {
        model.createNotes(inputValue, textareaValue, colorInput);
    },
};

view.init();
