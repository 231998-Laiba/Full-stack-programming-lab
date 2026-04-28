export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with 40-hour battery life, adaptive noise cancellation, and studio-quality sound. Perfect for work and travel.",
    price: 12999,
    category: "Electronics",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Mechanical Gaming Keyboard",
    description:
      "Compact TKL layout with Cherry MX switches, per-key RGB lighting, and a detachable USB-C cable. Built for serious gamers.",
    price: 8499,
    category: "Electronics",
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    description:
      "Lumbar support, adjustable armrests, and breathable mesh back. Designed for long work sessions with full postural comfort.",
    price: 34500,
    category: "Furniture",
    badge: "New",
  },
  {
    id: 4,
    title: "Smart Water Bottle",
    description:
      "Tracks daily hydration via Bluetooth, keeps drinks cold for 24 hours, and reminds you to drink with gentle LED glows.",
    price: 3299,
    category: "Lifestyle",
  },
  {
    id: 5,
    title: "Portable Laptop Stand",
    description:
      "Foldable aluminium stand compatible with all laptops. Six adjustable height levels and anti-slip pads for a stable desk setup.",
    price: 2199,
    category: "Accessories",
    badge: "Sale",
  },
  {
    id: 6,
    title: "4K Webcam with Ring Light",
    description:
      "Crystal-clear 4K streaming webcam with built-in ring light, autofocus, noise-cancelling mic, and plug-and-play USB setup.",
    price: 7800,
    category: "Electronics",
  },
];