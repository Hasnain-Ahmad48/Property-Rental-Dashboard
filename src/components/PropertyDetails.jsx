import {
  HiX,
  HiStar,
  HiLocationMarker,
  HiUsers,
  HiHeart,
  HiOutlineHeart,
} from "react-icons/hi";
import {useFavorites} from "../context/FavoritesContext";

export default function PropertyDetails({property, onClose}) {
  const {isFavorite, toggleFavorite} = useFavorites();
  const isLiked = isFavorite(property.id);

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <HiX className="text-2xl text-gray-700 dark:text-gray-300" />
        </button>

        {/* Image */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/30 backdrop-blur-md text-black rounded-xl text-sm font-medium shadow-lg">
            {property.type}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {property.name}
              </h2>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <HiLocationMarker className="mr-2 text-xl" />
                <span className="text-lg">{property.city}</span>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(property.id)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            >
              {isLiked ? (
                <HiHeart className="text-3xl text-red-500" />
              ) : (
                <HiOutlineHeart className="text-3xl text-gray-400" />
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {property.bedrooms}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Bedrooms
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {property.bathrooms}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Bathrooms
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
                <HiUsers className="mr-1" />
                {property.guests}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Guests
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
                <HiStar className="text-yellow-400 mr-1" />
                {property.rating}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Rating
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              About this property
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                ${property.price}
                <span className="text-lg font-normal text-gray-500">
                  {" "}
                  / night
                </span>
              </div>
            </div>
            <button className="btn-primary w-full sm:w-auto">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
