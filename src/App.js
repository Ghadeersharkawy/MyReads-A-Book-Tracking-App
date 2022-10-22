import "./App.css";
import * as BooksAPI from './BooksAPI';
import React, { useState, useEffect } from "react";
import ListBooks from "./components/ListBooks";
import Search from "./components/Search";

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
    setShelf(shelf => book.shelf = tshelf);
    BooksAPI.update(book, tshelf);
    //console.log(shelf);
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <Search showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} books={books} handleShelfChange={handleShelfChange} />
      ) : (
        <React.Fragment>
          <ListBooks books={books} shelf={shelf} handleShelfChange={handleShelfChange} />
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
