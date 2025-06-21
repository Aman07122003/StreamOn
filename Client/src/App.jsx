import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import UploadVideo from './components/UploadVideo';
import Videoplayer from './pages/Videoplayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
          }
        />
        <Route path="/watch" element={<Videoplayer />} />
      </Routes>
    </Router>
  );
}

export default App;
