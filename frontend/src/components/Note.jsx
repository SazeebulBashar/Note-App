import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        // <div className="note-container m-2 w-30">
        //     <p className="note-title">{note.title}</p>
        //     <p className="note-content">{note.content}</p>
        //     <p className="note-date">{formattedDate}</p>
        //     <button className="delete-button" onClick={() => onDelete(note.id)}>
        //         Delete
        //     </button>
        // </div>
        <div className="col">
        <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <hr />
                <p className="card-text">
                  {note.content.slice(0,80)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
              <button className="delete-button" onClick={() => onDelete(note.id)}>
              <i className="bi bi-trash-fill"></i>
             </button>
             <button className="delete-button">
             <i className="bi bi-pen-fill"></i>
             </button>
              </div>
              
        </div>
        </div>
    );
}

export default Note