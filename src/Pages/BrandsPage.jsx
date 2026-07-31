import React from "react";
import { Link } from "react-router-dom";
import "../Styles/BrandPage.css";

const brands = [
  {
    name: "Zara",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    products: 120,
  },
  {
    name: "Gucci",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    products: 85,
  },
  {
    name: "Prada",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    products: 70,
  },
  {
    name: "Versace",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    products: 55,
  },
  {
    name: "Calvin Klein",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    products: 95,
  },
];

const BrandsPage = () => {
  return (
    <div className="brands-page">

      <section className="brands-hero">
        <h1>Explore Premium Brands</h1>

        <p>
          Discover the world's most popular fashion brands in one place.
          Shop premium collections with trusted quality.
        </p>
      </section>

      <section className="brands-grid">

        {brands.map((brand, index) => (

          <Link
            key={index}
            className="brand-card"
            to={`/brand/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
          >

            <img
              src={brand.image}
              alt={brand.name}
            />

            <div className="overlay">

              <h2>{brand.name}</h2>

              <span>{brand.products}+ Products</span>

              <button>
                View Collection →
              </button>

            </div>

          </Link>

        ))}

      </section>

    </div>
  );
};

export default BrandsPage;