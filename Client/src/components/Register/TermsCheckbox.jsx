import React from 'react';
import { Link } from 'react-router-dom';

const TermsCheckbox = () => {
  return (
    <div className="flex items-center">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-700 bg-gray-900/50 text-purple-500 focus:ring-purple-500/50"
        required
      />
      <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
        I agree to the{' '}
        <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
          Privacy Policy
        </Link>
      </label>
    </div>
  );
};

export default TermsCheckbox; 