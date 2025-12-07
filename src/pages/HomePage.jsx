import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import FiltersBar from '../components/FiltersBar';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import PropertyDetails from '../components/PropertyDetails';
import SkeletonCard from '../components/SkeletonCard';
import { filterProperties } from '../utils/filterProperties';
import { useDebounce } from '../hooks/useDebounce';
import { HiEmojiSad } from 'react-icons/hi';

export default function HomePage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        priceRange: [0, 600],
        city: 'All',
        type: 'All',
        rating: 0,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProperty, setSelectedProperty] = useState(null);

    const debouncedSearch = useDebounce(searchQuery, 300);

    // Load properties
    useEffect(() => {
        const loadProperties = async () => {
            setLoading(true);
            try {
                const response = await fetch('/properties.json');
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error loading properties:', error);
            } finally {
                setTimeout(() => setLoading(false), 800); // Simulate loading delay
            }
        };
        loadProperties();
    }, []);

    // Apply filters
    const filteredProperties = filterProperties(properties, {
        ...filters,
        searchQuery: debouncedSearch,
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            priceRange: [0, 600],
            city: 'All',
            type: 'All',
            rating: 0,
        });
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Find Your Perfect <span className="text-gradient">Rental</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Discover amazing properties across the country
                    </p>
                </div>

                {/* Search and View Toggle */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
                    <div className="flex-1">
                        <SearchBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    </div>
                    <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <FiltersBar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Properties Grid/List */}
                    <div className="lg:col-span-3">
                        {/* Results Count */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-600 dark:text-gray-400">
                                {loading ? (
                                    'Loading properties...'
                                ) : (
                                    <>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {filteredProperties.length}
                                        </span>
                                        {' '}properties found
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className={`grid ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                    : 'grid-cols-1'
                                } gap-6`}>
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        )}

                        {/* Properties Display */}
                        {!loading && filteredProperties.length > 0 && (
                            <div className={`grid ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                    : 'grid-cols-1'
                                } gap-6`}>
                                {filteredProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                        onViewDetails={setSelectedProperty}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && filteredProperties.length === 0 && (
                            <div className="text-center py-16 animate-fade-in">
                                <HiEmojiSad className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    No properties found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <button onClick={handleClearFilters} className="btn-primary">
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Property Details Modal */}
            {selectedProperty && (
                <PropertyDetails
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </div>
    );
}
