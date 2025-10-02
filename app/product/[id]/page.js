"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/product/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        setError("Product not found");
      }
    } catch (error) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="m-4">
        <div className="mb-4">
          <Link href="/" className="text-blue-600 underline">
            ← Home
          </Link>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">{error}</div>
        <div className="space-y-2">
          <div>
            <Link href="/" className="text-blue-600 underline">
              ← Home
            </Link>
          </div>
          <div>
            <Link href="/product" className="text-blue-600 underline">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="text-yellow-600 mb-4">Product not found</div>
        <div className="space-y-2">
          <div>
            <Link href="/" className="text-blue-600 underline">
              ← Home
            </Link>
          </div>
          <div>
            <Link href="/product" className="text-blue-600 underline">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <div>
          <Link href="/" className="text-blue-600 underline">
            ← Home
          </Link>
        </div>
        <div>
          <Link href="/product" className="text-blue-600 underline">
            ← Back to Products
          </Link>
        </div>
      </div>
      
      <h1 className="text-3xl text-violet-950 mb-6">Product Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-800 p-4">
          <h2 className="text-xl font-bold text-violet-700 mb-4">Product Information</h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Product Code</div>
              <div className="text-lg font-medium">{product.code}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Product Name</div>
              <div className="text-xl font-bold text-violet-600">{product.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Description</div>
              <div className="text-lg">{product.description}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Price</div>
              <div className="text-2xl font-bold text-green-600">{product.price} Baht</div>
            </div>
          </div>
        </div>

        <div className="border border-gray-800 p-4">
          <h2 className="text-xl font-bold text-violet-700 mb-4">Category Information</h2>
          <div>
            <div className="text-sm text-gray-600 mb-2">Category</div>
            <div className="text-lg">
              {product.category?.name ? (
                <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">
                  {product.category.name}
                </span>
              ) : (
                <span className="text-gray-500">Category not loaded</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-gray-800 p-4">
        <h2 className="text-xl font-bold text-violet-700 mb-4">System Information</h2>
        <div className="space-y-2">
          <div>
            <div className="text-sm text-gray-600">Product ID</div>
            <div className="text-sm font-mono">{product._id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
