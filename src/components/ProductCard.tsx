import Image from "next/image";
import { FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductCard = ({
  title,
  price,
  image,
  rating,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) => {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden flex flex-col h-full p-4 sm:p-6">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 rounded-2xl mb-4">
        <div className="aspect-[4/3] sm:aspect-square w-full">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-2xl"
            priority
          />
        </div>
        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          NEW
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-base ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 font-medium">({rating})</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 leading-tight flex-1">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
              Rs. {price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              Rs. {Math.round(price * 1.2)}
            </span>
          </div>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
            20% OFF
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={onAddToCart}
            className="w-full bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
          >
            <FaShoppingCart className="text-base" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={onBuyNow}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
          >
            <FaBolt className="text-base" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
