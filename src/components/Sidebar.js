import React from "react";

export default function Sidebar(props) {
  // This is a new state to define the current note where index is not used in the snippet.
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        {/* This is used to get the snippet of the code from the notes body and set it to the sidebar */}
        <h4 className="text-snippet">{note.body.split("\n")}</h4>

        {/* This is the delete button having the onClick event listenr  */}
        <button
          className="delete-btn"
          onClick={(event) => props.onClick(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    // This is just used to render the sidebar and the editor.
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
