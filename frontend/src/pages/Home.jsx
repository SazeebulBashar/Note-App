import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import "../styles/Form.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="row m-5">
      <div className="col-3">
        <h2 className="heading">Create a Note</h2>
        <form onSubmit={createNote} className="my-5">
          
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
         
          <br />
          <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
          ></textarea>
          <br />
          <input className="form-button" type="submit" value="Create"></input>
        </form>
      </div>
      <div className="col-9 ">
        <h2 className="heading">Notes</h2>
        <hr />

        <div className="row row-cols-1 row-cols-md-3 g-4">
          
            
          {
            (!notes || notes.length === 0) && <p>No notes found.</p> || notes &&
            notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />

          ))} 

          </div>
        </div>

        
      </div>
    
  );
}

export default Home;



