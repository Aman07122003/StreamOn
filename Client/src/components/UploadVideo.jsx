import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const UploadVideo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      setError("");
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setError("");
    } else {
      setError("Please select a valid video file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    if (!title || !description || !thumbnail || !videoFile) {
      setError("All fields are required");
      setLoader(false);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("videoFile", videoFile);
    try {
      await axiosInstance.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setVideoFile(null);
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "Error uploading video");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Upload Video
            </h1>
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter video title"
                required
              />
            </div>
            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                placeholder="Enter video description"
                required
              />
            </div>
            {/* Video Upload */}
             
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video File
              </label>

              {videoFile ? (
                <div>
                  <p className="mt-2 text-sm text-gray-300"><span className="text-green-400">Selected:</span> {videoFile.name}</p>
                  <div className="mt-4">
                    <video
                      src={URL.createObjectURL(videoFile)}
                      controls
                      className="w-full max-h-64 rounded-md border border-gray-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">MP4, WebM or Ogg</p>
                    </div>
                    <input
                      type="file"
                      name="videoFile" // ✅ Add name for validation
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoChange}
                      required
                    />
                  </label>
                </div>
              )}
            </div>


            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thumbnail
              </label>

              {thumbnail ? (
                <div>
                  <p className="mt-2 text-sm text-gray-300">
                   <span className="text-green-400">Selected:</span> {thumbnail.name}
                  </p>
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Thumbnail Preview"
                      className="w-40 h-auto rounded-md border border-gray-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG or JPEG</p>
                    </div>
                    <input
                      type="file"
                      name="thumbnail" // ✅ Add name to fix form control error
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      required
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1">Upload Progress: {uploadProgress}%</label>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease' }}
                  ></div>
                </div>
              </div>
            )}

            {/* Loader */}
            {loader && (
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                <div className="bg-purple-500 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loader}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                loader
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-[1.02]'
              }`}
            >
              {loader ? 'Uploading...' : 'Upload Video'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
