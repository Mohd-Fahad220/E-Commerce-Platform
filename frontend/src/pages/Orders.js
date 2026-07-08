import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

const LAST_ORDER_USER_ID_KEY = 'lastOrderUserId';

const Orders = () => {
  const { user } = useAuth();
  const rememberedUserId = localStorage.getItem(LAST_ORDER_USER_ID_KEY) || '';
  const defaultUserId = rememberedUserId || (user?.id ? String(user.id) : '');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [lookupUserId, setLookupUserId] = useState(defaultUserId);
  const [formData, setFormData] = useState({
    userId: defaultUserId,
    productName: '',
    quantity: '',
  });

  useEffect(() => {
    fetchOrders(lookupUserId);
    // Load remembered orders once when opening the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user?.id || localStorage.getItem(LAST_ORDER_USER_ID_KEY) || lookupUserId) {
      return;
    }

    const userId = String(user.id);
    setLookupUserId(userId);
    setFormData((prev) => ({ ...prev, userId: prev.userId || userId }));
    fetchOrders(userId);
    // Use the profile id only when it arrives after the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const normalizeOrders = (data) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.content)) {
      return data.content;
    }

    return data ? [data] : [];
  };

  const getErrorMessage = (err, fallback) => {
    const data = err.response?.data;

    if (typeof data === 'string') {
      return data;
    }

    if (err.response?.status === 403) {
      return data?.message || data?.error || 'Not authorized for this user. Use your own user ID unless you are logged in as admin.';
    }

    return data?.message || data?.error || fallback;
  };

  const fetchOrders = async (userId = lookupUserId) => {
    try {
      setLoading(true);
      if (!userId) {
        setOrders([]);
        setError('');
        return;
      }

      const response = await orderAPI.getUserOrders(userId);
      setOrders(normalizeOrders(response.data));
      setError('');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch orders'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    const userId = lookupUserId.trim();

    if (userId) {
      localStorage.setItem(LAST_ORDER_USER_ID_KEY, userId);
    }

    fetchOrders(userId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderUserId = Number.parseInt(formData.userId, 10);
    const quantity = Number.parseInt(formData.quantity, 10);

    if (!Number.isInteger(orderUserId) || orderUserId <= 0) {
      setError('Enter a valid user ID');
      return;
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError('Enter a quantity greater than 0');
      return;
    }

    try {
      const response = await orderAPI.createOrder({
        userId: orderUserId,
        productName: formData.productName.trim(),
        quantity,
      });
      const selectedUserId = formData.userId.trim();
      localStorage.setItem(LAST_ORDER_USER_ID_KEY, selectedUserId);
      setLookupUserId(selectedUserId);
      setOrders((prev) => [response.data, ...prev.filter((order) => order.id !== response.data.id)]);
      setFormData({ userId: selectedUserId, productName: '', quantity: '' });
      setError('');
      fetchOrders(selectedUserId);
      setShowForm(false);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create order'));
      console.error(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderAPI.cancelOrder(id);
        fetchOrders();
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to cancel order'));
      }
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await orderAPI.getOrderById(id);
      setSelectedOrder(response.data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch order details'));
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiPlus className="mr-2" /> Create Order
        </button>
      </div>

      <form onSubmit={handleLookupSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="number"
            name="lookupUserId"
            placeholder="User ID to show previous orders"
            value={lookupUserId}
            onChange={(e) => setLookupUserId(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Load Orders
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="userId"
              placeholder="User ID"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              min="1"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Create Order
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>User ID:</strong> {selectedOrder.userId}</p>
              <p><strong>Product:</strong> {selectedOrder.productName}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Price:</strong> ${selectedOrder.price}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                <p className="text-gray-600">User ID: {order.userId}</p>
                <p className="text-gray-600">Product: {order.productName}</p>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-gray-600">Price: ${order.price}</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-semibold mt-2 ${
                    order.status === 'Order Placed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(order.id)}
                  className="flex items-center flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition justify-center"
                >
                  <FiEye className="mr-1" /> View
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="flex items-center flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition justify-center"
                >
                  <FiTrash2 className="mr-1" /> Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
