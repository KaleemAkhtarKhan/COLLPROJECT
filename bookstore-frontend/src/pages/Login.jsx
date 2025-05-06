import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token);
      navigate('/books');
    } catch (error) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="col-md-6 mx-auto mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;