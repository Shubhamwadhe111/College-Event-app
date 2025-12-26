import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    college: user?.college || '',
    department: user?.department || '',
    year: user?.year || ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.studentId) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    updateUser(formData);
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      college: user.college || '',
      department: user.department || '',
      year: user.year || ''
    });
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-8">
      <div className="container mx-auto px-4" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            My Profile
          </h1>
          <p className="text-xl text-white/90">
            Manage your account information and preferences
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-8 p-4 rounded-xl backdrop-blur-md border ${
            message.type === 'success' 
              ? 'bg-green-500/20 border-green-400/30 text-green-100' 
              : 'bg-red-500/20 border-red-400/30 text-red-100'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-white/80 mb-6">{user.email}</p>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                user.role === 'student' 
                  ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30' 
                  : 'bg-purple-500/20 text-purple-200 border border-purple-400/30'
              }`}>
                {user.role === 'student' ? 'Student' : 'Event Organizer'}
              </span>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="text-sm text-white/70">
                  <p className="mb-2">📅 Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                  {user.college && (
                    <p>🏫 {user.college}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-white">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-white font-medium mb-2">Full Name *</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                        required
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm">
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="block text-white font-medium mb-2">Email Address *</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                        required
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm">
                        {user.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="block text-white font-medium mb-2">Student/Staff ID *</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                        required
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm">
                        {user.studentId}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="block text-white font-medium mb-2">Role</label>
                    <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm capitalize">
                      {user.role}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-white font-medium mb-2">College/University</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter college name"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm">
                        {user.college || 'Not specified'}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="block text-white font-medium mb-2">Department</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="e.g., Computer Science"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm">
                        {user.department || 'Not specified'}
                      </div>
                    )}
                  </div>
                </div>

                {user.role === 'student' && (
                  <div className="form-group mt-6">
                    <label className="block text-white font-medium mb-2">Year of Study</label>
                    {isEditing ? (
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                      >
                        <option value="" className="bg-gray-800">Select Year</option>
                        <option value="1st Year" className="bg-gray-800">1st Year</option>
                        <option value="2nd Year" className="bg-gray-800">2nd Year</option>
                        <option value="3rd Year" className="bg-gray-800">3rd Year</option>
                        <option value="4th Year" className="bg-gray-800">4th Year</option>
                        <option value="Graduate" className="bg-gray-800">Graduate</option>
                        <option value="PhD" className="bg-gray-800">PhD</option>
                      </select>
                    ) : (
                      <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 backdrop-blur-sm">
                        {user.year || 'Not specified'}
                      </div>
                    )}
                  </div>
                )}

                {isEditing && (
                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;