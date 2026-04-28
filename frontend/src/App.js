import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Recomendations from "./Recomendations";

function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    Modal.setAppElement("#root");
    axios
      .get("http://127.0.0.1:8000/books/")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleAddBook = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/books/", {
        name: name,
        author: author,
        genre: genre,
      })
      .then((response) => {
        setBooks([...books, response.data]);
        setName("");
        setAuthor("");
        setGenre("");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  const deleteBook = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/books/${id}/`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleEditBook = (id) => {
    axios
      .put(`http://127.0.0.1:8000/books/${id}/`, {
        name: name,
        author: author,
        genre: genre,
      })
      .then((response) => {
        setBooks(books.map((book) => (book.id === id ? response.data : book)));
        console.log("Book updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  return (
    <div className="container">
      <h1>Book List</h1>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">
            <strong>{book.name}</strong> by {book.author} ({book.genre})
            <button onClick={() => setSelectedBookId(book.id)}>Edit</button>
            <Modal
              isOpen={selectedBookId === book.id}
              onRequestClose={() => setSelectedBookId(null)}
              contentLabel="Book editing"
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
            >
              <h2>Modal title</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Book Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    Genre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
              </form>
              <div>
                <button
                  onClick={() => {
                    handleEditBook(book.id);
                    setSelectedBookId(null);
                  }}
                >
                  Edit
                </button>{" "}
                <button onClick={() => setSelectedBookId(null)}>Cancel</button>
              </div>
            </Modal>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => deleteBook(book.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <form className="mt-4" onSubmit={handleAddBook}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Book Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>

      <Recomendations />
    </div>
  );
}

export default App;
