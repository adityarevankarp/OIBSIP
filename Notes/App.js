const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
const duplicatedNotesContainer = document.querySelector("#duplicatedNotes");

addBtn.addEventListener("click", function() {
    addNote();
});

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
         <i class="copy fas fa-check"></i>
         <i class="trash fas fa-trash"></i>
         <i class="save fas fa-save"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".copy").addEventListener("click", function() {
        copyNoteToDuplicatedSection(note);
    });

    note.querySelector(".trash").addEventListener("click", function() {
        note.remove();
        saveNotes();
    });

    note.querySelector(".save").addEventListener("click", function() {
        saveNotes();
    });

    note.querySelector("textarea").addEventListener("focusout", function() {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

const copyNoteToDuplicatedSection = (note) => {
    note.remove();
    const text = note.querySelector("textarea").value;
    const duplicatedNote = document.createElement("div");
    duplicatedNote.classList.add("note");
    duplicatedNote.innerHTML = `
    <div class="tool">
         <i class="copy fas fa-check"></i>
         <i class="trash fas fa-trash"></i>
         <i class="save fas fa-save"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    duplicatedNote.querySelector(".copy").addEventListener("click", function() {
        copyNoteToDuplicatedSection(duplicatedNote);
    });

    duplicatedNote.querySelector(".trash").addEventListener("click", function() {
        duplicatedNote.remove();
        saveNotes();
    });

    duplicatedNote.querySelector(".save").addEventListener("click", function() {
        saveNotes();
    });

    duplicatedNotesContainer.appendChild(duplicatedNote);


};

(function() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
        addNote();
    } else {
        lsNotes.forEach((lsNote) => {
            addNote(lsNote);
        });
    }
})();