import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterHeader, RegisterForm } from '../components/Register';
import { useDispatch } from 'react-redux';
import { register } from '../store/slice/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
    coverImage: null
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({
    profile: null,
    cover: null
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState('');

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
    }

    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
  
    const isValid = validateForm();
    if (!isValid) return;
  
    if (!avatarFile) {
      setError("Profile image is required");
      return;
    }
  
    const payload = new FormData();
    payload.append('fullName', formData.name);
    payload.append('username', formData.username);
    payload.append('email', formData.email);
    payload.append('password', formData.password);
    payload.append('avatar', avatarFile);
    payload.append('coverImage', formData.coverImage);

    // Log all FormData entries
    for (let pair of payload.entries()) {
      console.log(pair[0]+ ':', pair[1]);
    }

    try {
      setIsLoading(true);
      await dispatch(register(payload)).unwrap(); // ← This unwraps the result and throws if rejected
      navigate('/home');
    } catch (error) {
      console.error("Register error:", error);
      setError(error?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
    
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'profile' && !file.type.startsWith('image/')) {
        setErrors({
          ...errors,
          profileImage: 'Please upload an image file'
        });
        return;
      }
      if (type === 'cover' && !file.type.startsWith('image/')) {
        setErrors({
          ...errors,
          coverImage: 'Please upload an image file'
        });
        return;
      }

      setFormData({
        ...formData,
        [type === 'profile' ? 'profileImage' : 'coverImage']: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          ...preview,
          [type]: reader.result
        });
      };
      reader.readAsDataURL(file);

      // Clear error
      setErrors({
        ...errors,
        [type === 'profile' ? 'profileImage' : 'coverImage']: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <RegisterHeader />
          
          <RegisterForm
            formData={formData}
            errors={errors}
            preview={preview}
            isLoading={isLoading}
            showPassword={showPassword}
            profileInputRef={profileInputRef}
            coverInputRef={coverInputRef}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            setShowPassword={setShowPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default Register; 