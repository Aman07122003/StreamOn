import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
// Optional: import Background3D if it's defined
// import Background3D from './Background3D';

function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(login({ email, username, password })).unwrap();
      setError('');
      navigate('/'); // Optional: redirect to "/profile" after successful login
    } catch (err) {
      setError(err || 'Login failed. Please try again.');
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-50">
      {/* Optional background */}
      {/* <Background3D /> */}

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-400 mt-2">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-400 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700/50 bg-gray-900/50 text-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700/50 bg-gray-900/50 text-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter your username"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-700/50 bg-gray-900/50 text-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700/50 text-purple-500 focus:ring-purple-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-gray-50 bg-gradient-to-r from-purple-500 to-indigo-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition transform"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="text-purple-400 font-semibold hover:text-purple-300 transition"
                >
                  Sign up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 