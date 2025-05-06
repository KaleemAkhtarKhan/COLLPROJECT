import { Link } from 'react-router-dom';
import { addToCart } from '../services/api';

const BookCard = ({ book, onEdit, onDelete }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart({ bookId: book.id, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <Link to={`/books/${book.id}`} className="card-title h5 text-primary text-decoration-none">
          {book.title}
        </Link>
        <p className="card-text text-muted">Author: {book.author}</p>
        <p className="card-text text-muted">ISBN: {book.isbn}</p>
        <p className="card-text fw-bold">Price: ${book.price}</p>
        <p className="card-text text-muted">Stock: {book.stock}</p>
        <div className="d-flex gap-2">
          <button
            onClick={handleAddToCart}
            className="btn btn-success btn-sm"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onEdit(book)}
            className="btn btn-warning btn-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;