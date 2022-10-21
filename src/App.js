import "./App.css";
import * as BooksAPI from './BooksAPI';
import React, { useState, useEffect } from "react";
import ListBooks from "./components/ListBooks";
import Search from "./components/Search";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <Search showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} />
      ) : (
        <React.Fragment>
          <ListBooks books={books} />
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
