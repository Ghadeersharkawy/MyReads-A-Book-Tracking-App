import { useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';

function Search({ showSearchPage, setShowSearchpage, books, handleShelfChange }) {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // console.log(books);
    const handelSearchQuery = (query) => {
        console.log(query);
        setQuery(query);

    }

    useEffect(() => {
        console.log('queryupdated');
        if (query.length > 0)
        {
            const searchBooks = async () => {
                const searchRes = await BooksAPI.search(query);
                // console.log(searchRes);
                if (searchRes.error)
                {
                    setSearchResults([]);
                } else
                {
                    setSearchResults(searchRes);
                }

                console.log(searchResults);
            };

            searchBooks();
        } else
        {
            setSearchResults([]);
        }

    }, [query]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    className="close-search"
                    onClick={() => setShowSearchpage(!showSearchPage)}
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => handelSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.length === 0 ? [] : searchResults.map((s) => {
                        return (<li key={s.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage:
                                                `url(${s.imageLinks.thumbnail})`,
                                        }}
                                    ></div>
                                    <div className="book-shelf-changer">
                                        {console.log(s.shelf)}
                                        <select value={s.shelf === undefined ? 'none' : s.shelf} onChange={(ev) => handleShelfChange(s, ev.target.value)}>
                                            <option disabled>
                                                Move to...
                                            </option>
                                            <option value="currentlyReading">
                                                Currently Reading
                                            </option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{s.title}</div>
                                <div className="book-authors">{s.authors}</div>
                            </div>
                        </li>);
                    })
                    }
                </ol>
            </div>
        </div>
    );
}
export default Search