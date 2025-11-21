'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/lib/store';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut } from 'react-icons/fi';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <FiUser className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                href="/account"
                className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 text-primary-600 font-semibold"
              >
                <FiUser className="w-5 h-5" />
                Profile
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <FiPackage className="w-5 h-5" />
                My Orders
              </Link>
              <Link
                href="/account/wishlist"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <FiHeart className="w-5 h-5" />
                Wishlist
              </Link>
              <Link
                href="/account/addresses"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <FiMapPin className="w-5 h-5" />
                Saved Addresses
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={user.phone || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

