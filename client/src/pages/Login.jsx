import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPasswordValid = form.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const resultAction = await dispatch(login(form));
      if (login.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Error is handled in Redux
    }
  };

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

      {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${touched.email && !isEmailValid ? 'border-red-500' : ''}`}
            required
          />
          {touched.email && !isEmailValid && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid email.</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${touched.password && !isPasswordValid ? 'border-red-500' : ''}`}
            required
          />
          {touched.password && !isPasswordValid && (
            <p className="text-xs text-red-500 mt-1">Password must be at least 6 characters.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm text-indigo-600">
        <a href="/forgot-password" className="hover:underline">Forgot password?</a>
        <a href="/signup" className="hover:underline">Create an account</a>
      </div>
    </div>
  );
}
