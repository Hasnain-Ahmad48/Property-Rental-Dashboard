export function filterProperties(properties, filters) {
    return properties.filter(property => {
        // Price filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange;
            if (property.price < min || property.price > max) {
                return false;
            }
        }

        // City filter
        if (filters.city && filters.city !== 'All') {
            if (property.city !== filters.city) {
                return false;
            }
        }

        // Property type filter
        if (filters.type && filters.type !== 'All') {
            if (property.type !== filters.type) {
                return false;
            }
        }

        // Rating filter
        if (filters.rating) {
            if (property.rating < filters.rating) {
                return false;
            }
        }

        // Search query filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const nameMatch = property.name.toLowerCase().includes(query);
            const locationMatch = property.city.toLowerCase().includes(query);
            const descriptionMatch = property.description.toLowerCase().includes(query);

            if (!nameMatch && !locationMatch && !descriptionMatch) {
                return false;
            }
        }

        return true;
    });
}
