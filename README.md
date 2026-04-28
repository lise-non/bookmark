# BookMark

A full-stack reading tracker app. Add, edit, and delete books from a list.
In the future i want to add reading statiscs with Rechearts and book recomandation based on previous reads (as well as a nice UI <3)

Built with **Django REST Framework** (backend) and **React** (frontend).

## Stack

- Backend: Python / Django / Django REST Framework / Anthropic SDK
- Frontend: React / Axios / react-modal / Bootstrap

## Getting started

### Backend

```bash
cd /Users/lise/Documents/projets/bookMark
source .venv/bin/activate
cd bookmmark
python3 manage.py migrate
python3 manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/books/`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`.

## Features

- List all books, split into "Currently reading" and "Completed"
- Add a book (name, author, genre)
- Edit a book via modal
- Delete a book
- Mark books as read / unread
- **AI-powered recommendations** — click "Get Recommendations" to get 5 book suggestions based on your completed books, powered by Claude (Anthropic)
# bookmark
# bookmark
