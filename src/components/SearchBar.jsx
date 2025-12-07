import { HiSearch, HiX } from 'react-icons/hi';

export default function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <HiSearch className="text-gray-400 text-xl" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search properties by name or location..."
                className="input-field pl-12 pr-12"
            />
            {searchQuery && (
                <button
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <HiX className="text-xl" />
                </button>
            )}
        </div>
    );
}
