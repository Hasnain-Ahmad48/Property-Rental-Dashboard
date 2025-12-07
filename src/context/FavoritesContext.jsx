import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (propertyId) => {
        setFavorites(prev => {
            if (prev.includes(propertyId)) {
                return prev;
            }
            return [...prev, propertyId];
        });
    };

    const removeFromFavorites = (propertyId) => {
        setFavorites(prev => prev.filter(id => id !== propertyId));
    };

    const toggleFavorite = (propertyId) => {
        if (favorites.includes(propertyId)) {
            removeFromFavorites(propertyId);
        } else {
            addToFavorites(propertyId);
        }
    };

    const isFavorite = (propertyId) => {
        return favorites.includes(propertyId);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            toggleFavorite,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
}
