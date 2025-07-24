import "../styles/ProductCard.css";

type ProductProps = {
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ title, price, image }: ProductProps) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h2>{title}</h2>
      <p className="price">Rs. {price}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
}
