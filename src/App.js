import "./App.css";
import * as BooksAPI from './BooksAPI';
import React, { useState, useEffect } from "react";
import ListBooks from "./components/ListBooks";
import Search from "./components/Search";
import { Link, Routes, Route } from 'react-router-dom'

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [shelf, setShelf] = useState('none');



  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();

  }, []);

  const handleShelfChange = (book, tshelf) => {
    // console.log(book, tshelf);
    setShelf(book.shelf = tshelf);
    BooksAPI.update(book, tshelf);
    //console.log(shelf);
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/search" element={<Search showSearchPage={showSearchPage} shelf={shelf} setShowSearchpage={setShowSearchpage} books={books} handleShelfChange={handleShelfChange} />}></Route>

        <Route path="/" element={<ListBooks books={books} shelf={shelf} handleShelfChange={handleShelfChange} />}></Route>

      </Routes>

    </div>
  );
}

export default App;
