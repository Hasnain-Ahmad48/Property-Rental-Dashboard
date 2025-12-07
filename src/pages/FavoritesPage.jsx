import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyDetails from '../components/PropertyDetails';
import ViewToggle from '../components/ViewToggle';
import { useFavorites } from '../context/FavoritesContext';
import { HiHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { favorites } = useFavorites();

    // Load all properties
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
                setLoading(false);
            }
        };
        loadProperties();
    }, []);

    // Filter to show only favorited properties
    const favoriteProperties = properties.filter(property =>
        favorites.includes(property.id)
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <HiHeart className="text-red-500 mr-4" />
                        Your Favorites
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {favoriteProperties.length > 0
                            ? `You have ${favoriteProperties.length} saved ${favoriteProperties.length === 1 ? 'property' : 'properties'}`
                            : 'You haven\'t saved any properties yet'
                        }
                    </p>
                </div>

                {/* View Toggle */}
                {favoriteProperties.length > 0 && (
                    <div className="flex justify-end mb-6 animate-fade-in">
                        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
                    </div>
                )}

                {/* Favorites Display */}
                {!loading && favoriteProperties.length > 0 && (
                    <div className={`grid ${viewMode === 'grid'
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                        } gap-6`}>
                        {favoriteProperties.map((property) => (
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
                {!loading && favoriteProperties.length === 0 && (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiHeart className="text-4xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No favorites yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Start exploring properties and save your favorites by clicking the heart icon
                        </p>
                        <Link to="/" className="btn-primary inline-block">
                            Explore Properties
                        </Link>
                    </div>
                )}
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
