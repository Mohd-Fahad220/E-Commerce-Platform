import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Users',
      count: '---',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'bg-blue-500',
      action: () => navigate('/users'),
    },
    {
      title: 'Orders',
      count: '---',
      icon: <FiShoppingCart className="w-8 h-8" />,
      color: 'bg-purple-500',
      action: () => navigate('/orders'),
    },
    {
      title: 'Revenue',
      count: '$---',
      icon: <FiTrendingUp className="w-8 h-8" />,
      color: 'bg-green-500',
      action: () => navigate('/orders'),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to E-Commerce Microservices Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.action}
            className={`${stat.color} rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition transform hover:scale-105`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white opacity-90 mb-2">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.count}</p>
              </div>
              <div className="opacity-30">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/users')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition font-semibold"
            >
              Manage Users
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition font-semibold"
            >
              Manage Orders
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Gateway</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">User Service</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Order Service</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="text-gray-600 text-center py-8">
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
