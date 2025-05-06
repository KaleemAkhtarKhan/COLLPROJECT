import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getBooks, createBook, updateBook, deleteBook } from '../services/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: 0,
    stock: 0,
  });
  const [editingBookId, setEditingBookId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        setError('Failed to fetch books');
      }
    };
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' || name === 'stock' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.isbn || formData.price <= 0 || formData.stock < 0) {
      setError('All fields are required and must be valid');
      return;
    }
    try {
      if (editingBookId) {
        await updateBook(editingBookId, formData);
        setBooks(books.map((book) =>
          book.id === editingBookId ? { ...book, ...formData, id: editingBookId } : book
        ));
        setEditingBookId(null);
      } else {
        const response = await createBook(formData);
        setBooks([...books, response.data]);
      }
      setFormData({ title: '', author: '', isbn: '', price: 0, stock: 0 });
      setError('');
    } catch (error) {
      setError(editingBookId ? 'Failed to update book' : 'Failed to add book');
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      stock: book.stock,
    });
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      setError('Failed to delete book');
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">{editingBookId ? 'Edit Book' : 'Add Book'}</h2>
      <div className="card shadow mb-5">
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              {editingBookId ? 'Update Book' : 'Add Book'}
            </button>
          </form>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book) => (
          <div key={book.id} className="col">
            <BookCard
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;