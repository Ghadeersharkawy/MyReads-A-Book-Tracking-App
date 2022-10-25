import { useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function Search({ books, handleShelfChange }) {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const foundBooks = [];

    const handelSearchQuery = (query) => {

        setQuery(query);

    }

    useEffect(() => {

        if (query.length > 0)
        {
            const searchBooks = async () => {
                const searchRes = await BooksAPI.search(query);

                if (searchRes.error)
                {
                    setSearchResults([]);
                } else
                {
                    setSearchResults(searchRes);
                }


            };

            searchBooks();
        } else
        {
            setSearchResults([]);
        }

    }, [query]);



    searchResults.map(result => {
        const matchingResults = books.filter(book => book.id === result.id);

        if (matchingResults.length > 0)
        {

            return foundBooks.push(...matchingResults);

        } else
        {
            return foundBooks.push(result);

        }
    });

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search" to="/"

                >
                    Close
                </Link>
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
                    {foundBooks.map((s) => {
                        return (<li key={s.id}>
                            <div className="book">
                                <div className="book-top">
                                    {s.imageLinks && (
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage:
                                                    `url(${s.imageLinks.thumbnail})`,
                                            }}
                                        ></div>
                                    )}

                                    <div className="book-shelf-changer">

                                        <select value={s.shelf ? s.shelf : 'none'} onChange={(ev) => handleShelfChange(s, ev.target.value)}>
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
Search.propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
};

export default Search