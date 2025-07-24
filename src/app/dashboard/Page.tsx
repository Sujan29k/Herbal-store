"use client";
import ProductCard from "@/components/ProductCard";

const sampleProducts = [
  {
    title: "Tulsi Herbal Tea",
    price: 250,
    image: "/images/products/tulsi.jpg",
  },
  {
    title: "Neem Powder",
    price: 180,
    image: "/images/products/neem.jpg",
  },
];

export default function Dashboard() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {sampleProducts.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  );
}
