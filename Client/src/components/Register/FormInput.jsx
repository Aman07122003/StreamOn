import React from 'react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const FormInput = ({ 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  showPassword, 
  setShowPassword,
  showPasswordToggle = false 
}) => {
  const getIcon = () => {
    switch (name) {
      case 'username':
      case 'name':
        return <FiUser className="h-5 w-5 text-gray-400" />;
      case 'email':
        return <FiMail className="h-5 w-5 text-gray-400" />;
      case 'password':
      case 'confirmPassword':
        return <FiLock className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (name) {
      case 'username':
        return 'Username';
      case 'name':
        return 'Full Name';
      case 'email':
        return 'Email';
      case 'password':
        return 'Password';
      case 'confirmPassword':
        return 'Confirm Password';
      default:
        return name;
    }
  };

  const getHelpText = () => {
    if (name === 'username') {
      return 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
    }
    return null;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {getLabel()}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {getIcon()}
        </div>
        <input
          type={showPasswordToggle && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-900/50 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-xl py-3 pl-10 pr-${showPasswordToggle ? '12' : '4'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300`}
          placeholder={placeholder}
          required
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
      {getHelpText() && (
        <p className="mt-1 text-xs text-gray-500">{getHelpText()}</p>
      )}
    </div>
  );
};

export default FormInput; 