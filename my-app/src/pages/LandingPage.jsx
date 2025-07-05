import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Shop Everything You Need</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <div className="space-x-4">
            <a href="#products" className="px-8 py-3 bg-white text-purple-600 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition">Shop Now</a>
            <a href="#categories" className="px-8 py-3 bg-transparent border-2 border-white rounded-lg shadow-lg font-semibold hover:bg-white hover:text-purple-600 transition">Browse Categories</a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-semibold text-lg mb-2">Electronics</h3>
                <p className="text-gray-600">Phones, Laptops & More</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">👕</div>
                <h3 className="font-semibold text-lg mb-2">Fashion</h3>
                <p className="text-gray-600">Clothing & Accessories</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="font-semibold text-lg mb-2">Home & Garden</h3>
                <p className="text-gray-600">Furniture & Decor</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">⚽</div>
                <h3 className="font-semibold text-lg mb-2">Sports</h3>
                <p className="text-gray-600">Equipment & Gear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Wireless Headphones</h3>
                <p className="text-gray-600 text-sm mb-3">Premium sound quality with noise cancellation</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$99.99</span>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Add to Cart</button>
                </div>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Smart Watch</h3>
                <p className="text-gray-600 text-sm mb-3">Track your fitness and stay connected</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$199.99</span>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Laptop Backpack</h3>
                <p className="text-gray-600 text-sm mb-3">Durable and stylish laptop protection</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$49.99</span>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Coffee Maker</h3>
                <p className="text-gray-600 text-sm mb-3">Perfect coffee every morning</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$79.99</span>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-xl mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-xl mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="font-semibold text-xl mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8">Get the latest deals and product updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg text-gray-800 flex-1"
            />
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
