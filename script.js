document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notes');
    const addNoteButton = document.getElementById('addNote');
    const noteModal = new bootstrap.Modal(document.getElementById('noteModal'), {});
    const noteForm = document.getElementById('noteForm');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function displayNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteCard = document.createElement('div');
            noteCard.className = 'card mb-4 card-note';
            noteCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.content}</p>
                    <button class="btn btn-danger" onclick="deleteNote(${index})">Delete</button>
                </div>
            `;
            notesContainer.appendChild(noteCard);
        });
    }

    window.deleteNote = function(index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }

    addNoteButton.addEventListener('click', function() {
        noteModal.show();
    });

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const noteTitle = document.getElementById('noteTitle').value;
        const noteContent = document.getElementById('noteContent').value;
        notes.push({ title: noteTitle, content: noteContent });
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        noteForm.reset();
        noteModal.hide();
    });

    displayNotes();
});
