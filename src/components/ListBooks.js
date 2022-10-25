import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
function ListBooks({ books, handleShelfChange, shelf }) {

    return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>

                        <Book books={books.filter(b => b.shelf === 'currentlyReading')} shelfChange={handleShelfChange} />

                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <Book books={books.filter(b => b.shelf === 'wantToRead')} shelfChange={handleShelfChange} />
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <Book books={books.filter(b => b.shelf === 'read')} shelfChange={handleShelfChange} />
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    );
}
ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
};
export default ListBooks