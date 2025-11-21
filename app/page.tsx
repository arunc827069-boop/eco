import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const trendingProducts = products.slice(2, 8);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Shop the Best Deals Online
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Discover amazing products at unbeatable prices. Fast delivery and
              secure payments.
            </p>
            <Link
              href="/category/electronics"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Flash Sale ⚡</h2>
            <Link
              href="/category/electronics"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now 🔥</h2>
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Special Offer!</h2>
            <p className="text-xl mb-6">
              Get 50% off on your first order. Use code: FIRST50
            </p>
            <Link
              href="/category/electronics"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

