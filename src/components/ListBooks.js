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


                    <Book books={books.filter(b => b.shelf === 'currentlyReading')} title='Currently Reading' shelfChange={handleShelfChange} />


                    <Book books={books.filter(b => b.shelf === 'wantToRead')} title='Want to Read' shelfChange={handleShelfChange} />


                    <Book books={books.filter(b => b.shelf === 'read')} title='Read' shelfChange={handleShelfChange} />

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