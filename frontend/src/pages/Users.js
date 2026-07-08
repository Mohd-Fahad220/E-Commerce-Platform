import React, { useState, useEffect, useCallback } from 'react';
import { userAPI } from '../services/apiClient';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const getErrorMessage = (err, fallback) => {
  const data = err.response?.data;

  if (typeof data === 'string') {
    return data;
  }

  return data?.message || data?.error || fallback;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers(0, 100);
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch users'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await userAPI.updateUser(editingId, {
          name: formData.name.trim(),
          email: formData.email.trim(),
        });
      } else {
        await userAPI.createUser({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });
      }
      setFormData({ name: '', email: '', password: '' });
      setEditingId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to save user'));
      console.error(err);
    }
  };

  const handleEdit = (userData) => {
    setFormData({
      name: userData.name || '',
      email: userData.email,
      password: '',
    });
    setEditingId(userData.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        fetchUsers();
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete user'));
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', email: '', password: '' });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiPlus className="mr-2" /> Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit User' : 'Add New User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!editingId && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((userData) => (
          <div
            key={userData.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {userData.name}
              </h3>
              <p className="text-gray-600 text-sm">{userData.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(userData)}
                className="flex items-center flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition justify-center"
              >
                <FiEdit2 className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(userData.id)}
                className="flex items-center flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition justify-center"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found</p>
        </div>
      )}
    </div>
  );
};

export default Users;
