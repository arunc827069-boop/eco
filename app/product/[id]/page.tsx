'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { products } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { useWishlistStore } from '@/lib/store';
import StructuredData from '@/components/StructuredData';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === productId);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link
          href="/"
          className="text-primary-600 hover:underline"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    window.location.href = '/checkout';
  };

  return (
    <>
      <StructuredData product={product} type="product" />
      <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-primary-600'
                    : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
            <span className="text-green-600 font-semibold">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Offers */}
          {product.offers && product.offers.length > 0 && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Offers</h3>
              <ul className="space-y-1">
                {product.offers.map((offer, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-lg font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                if (inWishlist) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist(product);
                }
              }}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                inWishlist
                  ? 'border-red-500 text-red-500'
                  : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
              }`}
            >
              ♥
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3">
              <FiTruck className="w-5 h-5 text-primary-600" />
              <span>Free delivery on orders above ₹500</span>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="w-5 h-5 text-primary-600" />
              <span>7-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-3 font-semibold w-1/3">{key}</td>
                    <td className="py-3 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-center py-8">
            <p className="text-gray-500">
              Be the first to review this product!
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

