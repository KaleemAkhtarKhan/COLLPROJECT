import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <header className="bg-primary text-white shadow">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="fs-4 fw-bold text-white text-decoration-none">BookStore</Link>
        <button
          className="d-md-none btn btn-outline-light"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="bi bi-list"></i>
        </button>
        <nav className={`d-md-flex align-items-center ${isOpen ? 'd-block' : 'd-none'} d-md-block`}>
          <Link to="/" className="text-white mx-2 text-decoration-none">Home</Link>
          <Link to="/books" className="text-white mx-2 text-decoration-none">Books</Link>
          <Link to="/cart" className="text-white mx-2 text-decoration-none">Cart</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline-light mx-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2 text-decoration-none">Login</Link>
              <Link to="/register" className="text-white mx-2 text-decoration-none">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;