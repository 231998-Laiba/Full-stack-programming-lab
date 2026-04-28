import Link from "next/link";
import { products } from "@/data/products";

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
        >
          {/* Color band based on category */}
          <div
            className={`h-2 w-full ${
              product.category === "Electronics"
                ? "bg-blue-500"
                : product.category === "Furniture"
                ? "bg-amber-500"
                : product.category === "Lifestyle"
                ? "bg-green-500"
                : "bg-purple-500"
            }`}
          />

          <div className="p-6 flex flex-col flex-grow">
            {/* Badge + Category row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {product.category}
              </span>
              {product.badge && (
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    product.badge === "Best Seller"
                      ? "bg-blue-50 text-blue-700"
                      : product.badge === "New"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
              {product.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-grow">
              {product.description}
            </p>

            {/* Price + CTA */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-gray-900">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-blue-600 group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}