import React from 'react';
import { FiUser, FiImage, FiCamera } from 'react-icons/fi';

const ImageUpload = ({ 
  type, 
  preview, 
  inputRef, 
  onImageChange, 
  error 
}) => {
  const isProfile = type === 'profile';
  const previewUrl = isProfile ? preview.profile : preview.cover;
  const errorMessage = isProfile ? error.profileImage : error.coverImage;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {isProfile ? 'Profile Image' : 'Cover Image'}
      </label>
      
      {isProfile ? (
        <div className="flex items-center space-x-4">
          <div 
            className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-900/50 border border-gray-700 cursor-pointer group"
            onClick={() => inputRef.current?.click()}
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiUser className="w-8 h-8 text-gray-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <FiCamera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400">Upload a profile picture</p>
            <p className="text-xs text-gray-500">Recommended: Square image, at least 200x200px</p>
          </div>
        </div>
      ) : (
        <div 
          className="relative h-32 rounded-xl overflow-hidden bg-gray-900/50 border border-gray-700 cursor-pointer group"
          onClick={() => inputRef.current?.click()}
        >
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Cover preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FiImage className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <FiCamera className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => onImageChange(e, type)}
        accept="image/*"
        className="hidden"
      />
      
      {errorMessage && (
        <p className="mt-1 text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default ImageUpload; 