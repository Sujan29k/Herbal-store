import Image from "next/image";
import { FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onViewDetails?: () => void;
}

const ProductCard = ({
  title,
  price,
  image,
  rating,
  onAddToCart,
  onBuyNow,
  onViewDetails,
}: ProductCardProps) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer"
        onClick={onViewDetails}
      >
        <div className="aspect-[4/3] sm:aspect-square w-full">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            priority
          />
        </div>
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-md">
          NEW
        </div>
        {/* Click to view details overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm lg:text-base font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-lg border-2 border-green-200">
            🔍 View Details
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center mb-1 sm:mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-xs ${
                  i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600">({rating})</span>
        </div>

        {/* Title */}
        <h3
          className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 leading-tight flex-1 cursor-pointer"
          onClick={onViewDetails}
        >
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 mt-auto">
          <div className="flex items-center space-x-1">
            <span className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
              Rs. {price}
            </span>
            <span className="text-xs text-gray-500 line-through">
              Rs. {Math.round(price * 1.2)}
            </span>
          </div>
          <span className="bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
            20% OFF
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <button
            onClick={onAddToCart}
            className="w-full bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg text-xs"
          >
            <FaShoppingCart className="text-xs" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={onBuyNow}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg text-xs"
          >
            <FaBolt className="text-xs" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
