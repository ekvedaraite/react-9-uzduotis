import React, { useEffect, useState } from 'react';
import './scss/main.scss';
import Note from './components/Note';

function App() {
  // Initialize state with either the notes from localStorage or an empty array
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    return storedNotes;
  });

  useEffect(() => {
    // Update localStorage whenever notes change
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: '',
      editing: true, // Set editing flag to true for a new note
    };

    // Update state with the new note
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    // Filter out the note with the specified id
    const updatedNotes = notes.filter((note) => note.id !== id);

    // Update state with the new array
    setNotes(updatedNotes);
  };

  const updateNote = (id, updatedContent) => {
    // Find the note with the specified id and update its content
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: updatedContent, editing: false } : note
    );

    // Update state with the new array
    setNotes(updatedNotes);
  };

  return (
    <>
    <div className='buttonDiv'>
      <button className="button" onClick={addNote}>
        +Add Note
      </button>
      </div>
      <div className='note-container'>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          content={note.content}
          editing={note.editing}
          onDelete={() => deleteNote(note.id)}
          onUpdate={updateNote}
        />
      ))}
      </div>
    </>
  );
}

export default App;
