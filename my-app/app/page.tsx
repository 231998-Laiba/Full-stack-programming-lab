import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white rounded-2xl p-10 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">Welcome to MyNextApp</h1>
        <p className="text-blue-100 text-lg">
          A multi-page Next.js application built with Tailwind CSS.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4 justify-center mb-8">
        <Link
          href="/products"
          className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Browse Products →
        </Link>
        <Link
          href="/about"
          className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          About Us
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "⚡", title: "Fast", desc: "Built with Next.js App Router for blazing fast performance." },
          { icon: "🎨", title: "Styled", desc: "Beautifully designed using Tailwind CSS utility classes." },
          { icon: "📱", title: "Responsive", desc: "Fully responsive layout that works on all screen sizes." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-3xl mb-3">{icon}</div>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}