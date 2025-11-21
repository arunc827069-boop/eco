'use client';

import { useState } from 'react';
import { FiPackage, FiUsers, FiDollarSign, FiTrendingUp, FiPlus } from 'react-icons/fi';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for dashboard
  const stats = {
    totalSales: 125000,
    totalOrders: 342,
    totalUsers: 1234,
    totalProducts: products.length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-4 px-4 font-semibold ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-4 font-semibold ${
              activeTab === 'products'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-4 font-semibold ${
              activeTab === 'orders'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-4 font-semibold ${
              activeTab === 'users'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600'
            }`}
          >
            Users
          </button>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Sales</p>
                  <p className="text-2xl font-bold">₹{stats.totalSales.toLocaleString()}</p>
                </div>
                <FiDollarSign className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <FiPackage className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <FiUsers className="w-10 h-10 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <FiTrendingUp className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="text-center py-8 text-gray-500">
              No recent activity to display
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              <FiPlus /> Add Product
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Order Management</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8 text-gray-500">
              No orders to display
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8 text-gray-500">
              No users to display
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

