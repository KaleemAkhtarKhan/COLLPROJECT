import { useState, useEffect } from 'react';
import { getCart, updateCartItem, deleteCartItem } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCartItems(response.data);
      } catch (error) {
        setError('Failed to fetch cart');
      }
    };
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const response = await updateCartItem(id, quantity);
      setCartItems(cartItems.map((item) =>
        item.id === id ? { ...item, quantity: response.data.quantity } : item
      ));
    } catch (error) {
      setError('Failed to update cart item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      setError('Failed to delete cart item');
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div className="card shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.book.title}</td>
                    <td>${item.book.price}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end">
              <p className="fw-bold">Total: ${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;