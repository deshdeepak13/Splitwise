import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiLoader, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [touched, setTouched] = useState({ 
    name: false, 
    email: false, 
    password: false,
    confirmPassword: false 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isNameValid = form.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPasswordValid = form.password.length >= 6;
  const doPasswordsMatch = form.password === form.confirmPassword;
  const isConfirmPasswordValid = form.confirmPassword.length > 0 && doPasswordsMatch;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

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
      const resultAction = await dispatch(signup({
        name: form.name,
        email: form.email,
        password: form.password
      }));
      if (signup.fulfilled.match(resultAction)) {
        navigate('/');
      }
    } catch (err) {
      // Error is handled in Redux
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4">
              <FiUser className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="text-gray-400 mt-2">Join us to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-800/50 rounded-lg text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiUser className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border ${
                    touched.name && !isNameValid
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {touched.name && !isNameValid && (
                <p className="mt-1 text-xs text-red-400">Name must be at least 2 characters</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border ${
                    touched.email && !isEmailValid
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {touched.email && !isEmailValid && (
                <p className="mt-1 text-xs text-red-400">Please enter a valid email address</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 bg-gray-700/50 border ${
                    touched.password && !isPasswordValid
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {touched.password && !isPasswordValid && (
                <p className="mt-1 text-xs text-red-400">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 bg-gray-700/50 border ${
                    touched.confirmPassword && !isConfirmPasswordValid
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {touched.confirmPassword && !isConfirmPasswordValid && (
                <p className="mt-1 text-xs text-red-400">
                  {form.confirmPassword.length === 0 
                    ? 'Please confirm your password' 
                    : 'Passwords do not match'}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium transition-all ${
                isFormValid && !isLoading
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg hover:shadow-blue-500/20'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin h-5 w-5" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Sign up</span>
                  <FiArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-800 text-sm text-gray-400 rounded-full">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg text-white hover:bg-gray-700/30 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}