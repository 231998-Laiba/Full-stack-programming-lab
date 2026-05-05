import React from "react";

function Products() {
  const products = [
    { id: 1, title: "Laptop", desc: "High performance laptop" },
    { id: 2, title: "Phone", desc: "Latest smartphone" },
    { id: 3, title: "Headphones", desc: "Noise cancelling" }
  ];

  const addToCart = (title) => alert(`${title} added to cart!`);

  return (
    <div className="container">
      <h1>Products</h1>
      {products.map(p => (
        <div key={p.id} className="card">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <button onClick={() => addToCart(p.title)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;