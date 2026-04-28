import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) return notFound();

  const categoryColor =
    product.category === "Electronics"
      ? "bg-blue-50 text-blue-700"
      : product.category === "Furniture"
      ? "bg-amber-50 text-amber-700"
      : product.category === "Lifestyle"
      ? "bg-green-50 text-green-700"
      : "bg-purple-50 text-purple-700";

  const accentBar =
    product.category === "Electronics"
      ? "bg-blue-500"
      : product.category === "Furniture"
      ? "bg-amber-500"
      : product.category === "Lifestyle"
      ? "bg-green-500"
      : "bg-purple-500";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600 transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.title}</span>
      </div>

      {/* Product Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Top accent bar */}
        <div className={`h-2 w-full ${accentBar}`} />

        <div className="p-8">
          {/* Category + Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
              {product.category}
            </span>
            {product.badge && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                {product.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Price Block */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Price</p>
              <p className="text-3xl font-bold text-gray-900">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150">
              Add to Cart
            </button>
          </div>

          {/* Product ID info */}
          <p className="text-xs text-gray-400">Product ID: #{product.id.toString().padStart(4, "0")}</p>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to all products
        </Link>
      </div>
    </div>
  );
}