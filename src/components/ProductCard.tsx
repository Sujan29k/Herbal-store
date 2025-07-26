import "../styles/ProductCard.css";

type ProductProps = {
  title: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
};

export default function ProductCard({
  title,
  price,
  image,
  onAddToCart,
  onBuyNow,
}: ProductProps) {
  return (
    <div className="product-card shadow-md border rounded overflow-hidden transition hover:shadow-lg bg-white">
      <img
        src={image}
        alt={title}
        className="product-image w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="price text-green-700 font-bold mb-3">Rs. {price}</p>
        <div className="flex space-x-2">
          <button
            className="add-to-cart bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="buy-now bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            onClick={onBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
