import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 fw-bold text-dark">Welcome to BookStore</h1>
      <p className="lead text-muted mb-4">
        Explore our collection of books and start your reading adventure!
      </p>
      <Link
        to="/books"
        className="btn btn-primary btn-lg"
      >
        Browse Books
      </Link>
    </div>
  );
};

export default Home;