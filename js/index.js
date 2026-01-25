const model = {
    notes: [],

    createNotes(inputValue, textareaValue, colorInput) {
        const note = {};
        note.title = inputValue;
        note.description = textareaValue;
        note.id = crypto.randomUUID();
        note.color = colorInput;
        note.isFavorite = false;
        this.notes.unshift(note);
        view.renderNotes(this.notes);
        this.updateNotesLength();
    },

    updateNotesLength() {
        const notesLength = this.notes.length;
        view.updateNotesCount(notesLength);
        view.updateNotesMessage(notesLength);
    },

    removeNote(id) {
        const index = this.notes.findIndex((element) => element.id === id);
        if (index !== -1) {
            this.notes.splice(index, 1);
        }
        view.renderNotes(this.notes);
        this.updateNotesLength();
    },

    toggleFavorite(noteId, newFavoriteState) {
        this.notes.forEach((element) => {
            if (element.id === noteId) {
                element.isFavorite = newFavoriteState;
            }
        });
    },

    getFavoriteNotes() {
        return this.notes.filter((note) => note.isFavorite);
    },
};

const view = {
    init() {
        this.deleteNote();
        this.notesFavorite();
        this.setupFavoriteButton();
        const form = document.querySelector(".note-form");
        const button = document.querySelector(".main-button");
        const input = document.querySelector(".name-noties");
        const textarea = document.querySelector(".note-description");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValue = input.value;
            const textareaValue = textarea.value;
            const checked = document.querySelector(
                'input[name="color"]:checked',
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
                input.value = "";
                textarea.value = "";

                controller.addNote(inputValue, textareaValue, colorInput);
            }
        });
    },

    renderNotes(notes) {
        this.updateFavoriteText();
        const notesList = document.querySelector(".notes-list");
        notesList.innerHTML = "";

        const showOnlyFavorites = document.querySelector(".active")
            ? true
            : false;

        notes.forEach((element) => {
            if (showOnlyFavorites && !element.isFavorite) return;

            const li = document.createElement("li");
            li.classList.add("addList");
            li.id = element.id;
            li.innerHTML = `
            <header class="headerNot">
            <h2>
            ${element.title}
            <span class="group">
                <span class="noteFavorite" role="checkbox" aria-pressed="false"></span>
                <span class="isDeleted"></span>
            </span>
            </h2>
            </header>
            <p>${element.description}</p>`;
            li.firstElementChild.classList.add(element.color);

            if (element.isFavorite) {
                const favoriteBtn = li.querySelector(".noteFavorite");
                favoriteBtn.classList.add("selected");
                favoriteBtn.setAttribute("aria-pressed", "true");
            }

            notesList.append(li);
        });
    },

    updateFavoriteText() {
        const filterBox = document.querySelector(".filter-box");

        if (!filterBox.querySelector(".filter-wrapper")) {
            filterBox.style.paddingTop = "24px";
            filterBox.innerHTML = `
        <div class="filter-wrapper">
            <button class="filterCheckbox" type="button" role="checkbox" aria-pressed="false"></button>
            <span class="filterText">Показать только избранные заметки</span>
        </div>`;
        }
    },

    updateNotesMessage(length) {
        const filterBox = document.querySelector(".filter-box");
        if (length === 0) {
            filterBox.style.paddingTop = "140px";
            filterBox.innerHTML = `
            <p>У вас нет еще ни одной заметки</p>
            <p>Заполните поля выше и создайте свою первую заметку!</p>
        `;
        }
    },

    updateNotesCount(length) {
        const count = document.querySelector(".count");
        count.textContent = length;
    },

    deleteNote() {
        const notesList = document.querySelector(".notes-list");

        notesList.addEventListener("click", (event) => {
            if (!event.target.classList.contains("isDeleted")) return;
            const li = event.target.closest("li");
            if (!li) return;
            controller.removeNote(li.id);
        });
    },

    setupFavoriteButton() {
        const filterBox = document.querySelector(".filter-box");

        filterBox.addEventListener("click", (event) => {
            const filterButton = event.target.closest(".filterCheckbox");
            if (!filterButton) return;

            const pressed =
                filterButton.getAttribute("aria-pressed") === "true";
            filterButton.setAttribute("aria-pressed", !pressed);
            filterButton.classList.toggle("active");

            if (!pressed) {
                this.renderNotes(model.getFavoriteNotes());
            } else {
                this.renderNotes(model.notes);
            }
        });
    },

    notesFavorite() {
        const notesList = document.querySelector(".notes-list");

        notesList.addEventListener("click", (event) => {
            const noteFavorite = event.target.closest(".noteFavorite");
            if (!noteFavorite) return;

            const li = noteFavorite.closest("li");
            if (!li) return;

            const pressed =
                noteFavorite.getAttribute("aria-pressed") === "true";
            noteFavorite.setAttribute("aria-pressed", !pressed);
            noteFavorite.classList.toggle("selected");
            const newFavoriteState = !pressed;
            controller.updateNoteFavorite(li.id, newFavoriteState);
        });
    },
};

const controller = {
    addNote(inputValue, textareaValue, colorInput) {
        model.createNotes(inputValue, textareaValue, colorInput);
    },
    removeNote(id) {
        model.removeNote(id);
    },
    updateNoteFavorite(noteId, newFavoriteState) {
        model.toggleFavorite(noteId, newFavoriteState);
    },
};

view.init();
