export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Rustik Plank</h1>
      <p className="text-orange-500 text-lg mb-8">Reclaimed & Handcrafted Furniture</p>
      <div className="prose text-gray-600 space-y-4 text-lg leading-relaxed">
        <p>Rustik Plank was founded with a simple mission: to create beautiful, sustainable furniture from reclaimed materials. Every piece we craft tells a story — of the wood that was saved, the hands that shaped it, and the home it now graces.</p>
        <p>Our craftsmen have decades of experience working with reclaimed timber, bringing new life to old wood. From beds to bookcases, chairs to cabinets, every item in our collection is unique and built to last generations.</p>
        <p>We believe furniture should be an investment — in quality, in sustainability, and in beauty. That's why we take the time to hand-select every piece of reclaimed wood and craft each item with care.</p>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-12 text-center">
        {[['500+','Pieces Crafted'],['15+','Years Experience'],['1000+','Happy Customers']].map(([num, label]) => (
          <div key={label} className="bg-orange-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-orange-500">{num}</p>
            <p className="text-gray-600 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
