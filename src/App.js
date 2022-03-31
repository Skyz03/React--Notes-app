import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
// import { data } from "./data"; This has not been used in the snippet
import Split from "react-split"; // THis is used to split the screen
import { nanoid } from "nanoid"; // This is used to generate unique id
import "./style.css"; // This is used to add css

export default function App() {
  // This state is  used to get the stored notes from local storage and set the current note where json parse is used as local storage only stores strings.

  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notesElem")) || []
  );

  // This is used to set the current note id
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  // This is used to set the current note in local storage.
  React.useEffect(() => {
    localStorage.setItem("notesElem", JSON.stringify(notes));
  }, [notes]);

  // This is used to create a new note with a default body text.
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  // This is used to set the current note to the top of the list.
  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  // This is used to delete the current note from the list where delete icon is pressed.
  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => {
      const newArray2 = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray2.splice(i, 1);
        } else {
          newArray2.push(oldNote);
        }
      }
      return newArray2;
    });
  }

  // This function helps to find the current note and provides its id.
  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {/* This condition is like if there is no note at beginning the sidebar will
      not be displayed like split and the bottom code will be executed. */}
      {notes.length > 0 ? (
        // This is the split of the sidebar and editor.

        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            onClick={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        // This code will work if the notes array is empty.
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
