import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import FormInput from './FormInput';
import TermsCheckbox from './TermsCheckbox';

const RegisterForm = ({
  formData,
  errors,
  preview,
  isLoading,
  showPassword,
  profileInputRef,
  coverInputRef,
  handleSubmit,
  handleChange,
  handleImageChange,
  setShowPassword
}) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cover Image Upload */}
        <ImageUpload
          type="cover"
          preview={preview}
          inputRef={coverInputRef}
          onImageChange={handleImageChange}
          error={errors}
        />

        {/* Profile Image Upload */}
        <ImageUpload
          type="profile"
          preview={preview}
          inputRef={profileInputRef}
          onImageChange={handleImageChange}
          error={errors}
        />

        {/* Username Input */}
        <FormInput
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          error={errors.username}
        />

        {/* Full Name Input */}
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          error={errors.name}
        />

        {/* Email Input */}
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        {/* Password Input */}
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showPasswordToggle={true}
        />

        {/* Confirm Password Input */}
        <FormInput
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showPasswordToggle={true}
        />

        {/* Terms Checkbox */}
        <TermsCheckbox />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl font-medium tracking-wide ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 