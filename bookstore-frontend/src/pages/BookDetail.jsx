import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById, addToCart } from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(Number(id));
        setBook(response.data);
      } catch (error) {
        setError('Failed to fetch book');
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    if (!book) return;
    try {
      await addToCart({ bookId: book.id, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      setError('Failed to add to cart');
    }
  };

  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!book) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="col-md-8 mx-auto mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{book.title}</h2>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">ISBN: {book.isbn}</p>
          <p className="card-text fw-bold">Price: ${book.price}</p>
          <p className="card-text">Stock: {book.stock}</p>
          <div className="d-flex gap-2">
            <button
              onClick={handleAddToCart}
              className="btn btn-success"
            >
              Add to Cart
            </button>
            <Link
              to="/books"
              className="btn btn-secondary"
            >
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;