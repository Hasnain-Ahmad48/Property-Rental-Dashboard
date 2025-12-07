import { useState } from 'react';
import { HiX, HiFilter } from 'react-icons/hi';

export default function FiltersBar({ filters, onFilterChange, onClearFilters }) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange || [0, 600]);

    const cities = ['All', 'Islamabad', 'Lahore', 'Rawalpindi', 'Karachi', 'Multan', 'Skardu', 'Peshawar', 'Quetta', 'Faisalabad'];
    const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Studio'];
    const ratings = [
        { label: 'All', value: 0 },
        { label: '4+ Stars', value: 4 },
        { label: '4.5+ Stars', value: 4.5 },
        { label: '4.8+ Stars', value: 4.8 }
    ];

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        const newRange = e.target.name === 'min' ? [value, localPriceRange[1]] : [localPriceRange[0], value];
        setLocalPriceRange(newRange);
        onFilterChange('priceRange', newRange);
    };

    const activeFilterCount =
        (filters.city && filters.city !== 'All' ? 1 : 0) +
        (filters.type && filters.type !== 'All' ? 1 : 0) +
        (filters.rating && filters.rating > 0 ? 1 : 0) +
        (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 600) ? 1 : 0);

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Price Range */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Price Range (per night)
                </label>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>${localPriceRange[0]}</span>
                        <span>${localPriceRange[1]}</span>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="range"
                            name="min"
                            min="0"
                            max="600"
                            step="10"
                            value={localPriceRange[0]}
                            onChange={handlePriceChange}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <input
                            type="range"
                            name="max"
                            min="0"
                            max="600"
                            step="10"
                            value={localPriceRange[1]}
                            onChange={handlePriceChange}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                    </div>
                </div>
            </div>

            {/* City Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    City
                </label>
                <select
                    value={filters.city || 'All'}
                    onChange={(e) => onFilterChange('city', e.target.value)}
                    className="input-field"
                >
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            {/* Property Type */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => onFilterChange('type', type)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${(filters.type || 'All') === type
                                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Minimum Rating
                </label>
                <div className="flex flex-wrap gap-2">
                    {ratings.map((rating) => (
                        <button
                            key={rating.label}
                            onClick={() => onFilterChange('rating', rating.value)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${(filters.rating || 0) === rating.value
                                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {rating.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
                <button
                    onClick={onClearFilters}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                    <HiX />
                    <span>Clear All Filters ({activeFilterCount})</span>
                </button>
            )}
        </div>
    );

    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden lg:block card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                    {activeFilterCount > 0 && (
                        <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                <FilterContent />
            </div>

            {/* Mobile Filter Button */}
            <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 btn-primary flex items-center space-x-2 shadow-2xl"
            >
                <HiFilter />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                    <span className="bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-full">
                        {activeFilterCount}
                    </span>
                )}
            </button>

            {/* Mobile Filter Modal */}
            {showMobileFilters && (
                <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <HiX className="text-2xl" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
}
