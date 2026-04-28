import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Recomendations from "./Recomendations";

function BookCard({ book, onEdit, onDelete, onToggle }) {
  return (
    <div className={`book-card${book.completed ? " completed" : ""}`}>
      <div className="book-info">
        <div className="book-title">{book.name}</div>
        <div className="book-author">by {book.author}</div>
        {(book.genre || book.completed) && (
          <div className="book-badges">
            {book.genre && <span className="badge-genre">{book.genre}</span>}
            {book.completed && <span className="badge-read">✓ Read</span>}
          </div>
        )}
      </div>
      <div className="book-actions">
        <button
          className={`btn btn-sm ${book.completed ? "btn-outline-secondary" : "btn-read"}`}
          onClick={onToggle}
        >
          {book.completed ? "Unread" : "✓ Mark Read"}
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const [selectedBookId, setSelectedBookId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editGenre, setEditGenre] = useState("");

  useEffect(() => {
    Modal.setAppElement("#root");
    axios
      .get("http://127.0.0.1:8000/books/")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleAddBook = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/books/", { name, author, genre })
      .then((response) => {
        setBooks([...books, response.data]);
        setName("");
        setAuthor("");
        setGenre("");
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  const deleteBook = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/books/${id}/`)
      .then(() => setBooks(books.filter((book) => book.id !== id)))
      .catch((error) => console.error("Error deleting book:", error));
  };

  const openEditModal = (book) => {
    setSelectedBookId(book.id);
    setEditName(book.name);
    setEditAuthor(book.author);
    setEditGenre(book.genre || "");
  };

  const handleEditBook = () => {
    axios
      .put(`http://127.0.0.1:8000/books/${selectedBookId}/`, {
        name: editName,
        author: editAuthor,
        genre: editGenre,
      })
      .then((response) => {
        setBooks(books.map((book) => (book.id === selectedBookId ? response.data : book)));
        setSelectedBookId(null);
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  const toggleCompleted = (book) => {
    axios
      .patch(`http://127.0.0.1:8000/books/${book.id}/`, { completed: !book.completed })
      .then((response) => {
        setBooks(books.map((b) => (b.id === book.id ? response.data : b)));
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  const reading = books.filter((b) => !b.completed);
  const completed = books.filter((b) => b.completed);

  return (
    <>
      <header className="app-header">
        <div className="container">
          <div className="app-header-content">
            <span className="app-logo">📚</span>
            <div>
              <h1 className="app-title">BookMark</h1>
              <p className="app-subtitle">Your personal reading tracker</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container main-content">
        <div className="row">
          <div className="col-lg-7 mb-4">
            <h2 className="section-title">My Reading List</h2>

            {books.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📖</div>
                <p>No books yet — add your first one!</p>
              </div>
            )}

            {reading.length > 0 && (
              <div className="book-section">
                <p className="subsection-label">Currently reading ({reading.length})</p>
                {reading.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={() => openEditModal(book)}
                    onDelete={() => deleteBook(book.id)}
                    onToggle={() => toggleCompleted(book)}
                  />
                ))}
              </div>
            )}

            {completed.length > 0 && (
              <div className="book-section">
                <p className="subsection-label">Completed ({completed.length})</p>
                {completed.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={() => openEditModal(book)}
                    onDelete={() => deleteBook(book.id)}
                    onToggle={() => toggleCompleted(book)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-5 mb-4">
            <h2 className="section-title">Add a Book</h2>
            <div className="form-card">
              <form onSubmit={handleAddBook}>
                <div className="mb-3">
                  <label className="form-label">Book Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. The Great Gatsby"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. F. Scott Fitzgerald"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Fiction"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-book w-100">
                  + Add Book
                </button>
              </form>
            </div>
          </div>
        </div>

        <Recomendations />
      </div>

      <Modal
        isOpen={selectedBookId !== null}
        onRequestClose={() => setSelectedBookId(null)}
        contentLabel="Edit book"
        className="edit-modal"
        overlayClassName="edit-modal-overlay"
      >
        <h2 className="modal-title">Edit Book</h2>
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            value={editGenre}
            onChange={(e) => setEditGenre(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-book" onClick={handleEditBook}>
            Save Changes
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSelectedBookId(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;
