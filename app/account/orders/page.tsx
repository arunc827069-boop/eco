'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/lib/store';
import { FiPackage, FiArrowLeft } from 'react-icons/fi';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // In a real app, you would fetch orders from an API
  const orders: any[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft /> Back to Account
      </Link>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders. Start shopping to see your orders here.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold">Total: ₹{order.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

