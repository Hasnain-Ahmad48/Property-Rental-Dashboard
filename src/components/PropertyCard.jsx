import { HiHeart, HiOutlineHeart, HiStar, HiLocationMarker, HiUsers } from 'react-icons/hi';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyCard({ property, onViewDetails, viewMode = 'grid' }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isLiked = isFavorite(property.id);

    if (viewMode === 'list') {
        return (
            <div className="card p-4 flex flex-col sm:flex-row gap-4 animate-fade-in hover:scale-[1.02] transition-transform duration-300">
                <img
                    src={property.image}
                    alt={property.name}
                    className="w-full sm:w-48 h-48 object-cover rounded-xl"
                    loading="lazy"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {property.name}
                            </h3>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                                <HiLocationMarker className="mr-1" />
                                <span>{property.city}</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-medium">
                                    {property.type}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(property.id);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isLiked ? (
                                <HiHeart className="text-2xl text-red-500" />
                            ) : (
                                <HiOutlineHeart className="text-2xl text-gray-400" />
                            )}
                        </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{property.bedrooms} beds</span>
                            <span>{property.bathrooms} baths</span>
                            <div className="flex items-center">
                                <HiUsers className="mr-1" />
                                <span>{property.guests} guests</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <HiStar className="text-yellow-400 mr-1" />
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {property.rating}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${property.price}
                                </div>
                                <div className="text-sm text-gray-500">per night</div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onViewDetails(property)}
                        className="mt-3 w-full btn-primary text-sm"
                    >
                        View Details
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="card overflow-hidden group cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300"
            onClick={() => onViewDetails(property)}
        >
            <div className="relative">
                <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-gray-800 hover:scale-110 transition-all duration-200 shadow-lg"
                    aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                >
                    {isLiked ? (
                        <HiHeart className="text-xl text-red-500" />
                    ) : (
                        <HiOutlineHeart className="text-xl text-gray-600 dark:text-gray-300" />
                    )}
                </button>
                <div className="absolute top-3 left-3 px-3 py-1 bg-primary-500 text-white rounded-lg text-sm font-medium shadow-lg">
                    {property.type}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {property.name}
                </h3>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <HiLocationMarker className="mr-1" />
                    <span>{property.city}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {property.description}
                </p>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3 space-x-3">
                    <span>{property.bedrooms} beds</span>
                    <span>•</span>
                    <span>{property.bathrooms} baths</span>
                    <span>•</span>
                    <span>{property.guests} guests</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <HiStar className="text-yellow-400 mr-1" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {property.rating}
                        </span>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${property.price}
                        </div>
                        <div className="text-xs text-gray-500">per night</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
