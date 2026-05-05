export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-semibold mb-1">MyNextApp</p>
        <p className="text-gray-400 text-sm">© 2026 My Next.js App. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}