import ProductList from "@/components/ProductList";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Products</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-500">
          Browse our collection of quality tech and lifestyle products.
        </p>
      </div>

      {/* Product Grid Component */}
      <ProductList />
    </div>
  );
}