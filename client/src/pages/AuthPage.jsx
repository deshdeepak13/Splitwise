import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';

// Enhanced Input Component with Password Toggle
const FormInput = ({ id, type, placeholder, icon, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-400 transition-colors">
        {icon}
      </div>
      <input
        id={id}
        name={id}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        required
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all backdrop-blur-sm"
        placeholder={placeholder}
      />
      {type === 'password' && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

// Social Login Button Component
const SocialButton = ({ provider, icon, color }) => (
  <button
    type="button"
    className={`w-full flex justify-center items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-opacity-90 transition-all ${color}`}
  >
    {icon}
    <span className="text-sm font-medium">Continue with {provider}</span>
  </button>
);

// Main Authentication Component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Animated Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-2xl mb-4">
            <FiLock className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back!' : 'Join Us Today'}
          </h1>
          <p className="text-gray-400 mt-2">
            {isLogin ? 'Sign in to access your dashboard' : 'Create an account to get started'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl shadow-xl backdrop-blur-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <FormInput 
                id="name" 
                type="text" 
                placeholder="Full Name" 
                icon={<FiUser className="w-5 h-5" />}
                value={formData.name}
                onChange={handleChange}
              />
            )}
            
            <FormInput 
              id="email" 
              type="email" 
              placeholder="Email Address" 
              icon={<FiMail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange}
            />
            
            <FormInput 
              id="password" 
              type="password" 
              placeholder="Password" 
              icon={<FiLock className="w-5 h-5" />}
              value={formData.password}
              onChange={handleChange}
            />

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Social Auth Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gray-800 text-sm text-gray-400 rounded-full">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Auth Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <SocialButton 
                provider="Google" 
                icon={<FaGoogle className="w-5 h-5" />} 
                color="bg-red-600 hover:bg-red-500" 
              />
              <SocialButton 
                provider="GitHub" 
                icon={<FaGithub className="w-5 h-5" />} 
                color="bg-gray-700 hover:bg-gray-600" 
              />
              <SocialButton 
                provider="Twitter" 
                icon={<FaTwitter className="w-5 h-5" />} 
                color="bg-blue-400 hover:bg-blue-300" 
              />
            </div>
          </div>
        </div>

        {/* Auth Mode Toggle */}
        <p className="mt-8 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button 
            onClick={toggleAuthMode} 
            className="font-medium text-blue-400 hover:text-blue-300 ml-1 transition-colors"
          >
            {isLogin ? 'Sign up now' : 'Sign in instead'}
          </button>
        </p>
      </div>
    </div>
  );
}; 

export default AuthPage;