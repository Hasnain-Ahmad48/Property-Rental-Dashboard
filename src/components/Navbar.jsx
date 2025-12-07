import { Link } from 'react-router-dom';
import { HiSun, HiMoon, HiHeart, HiMenu, HiX, HiHome } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { favorites } = useFavorites();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-black p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
                            <HiHome className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-bold text-black dark:text-white hidden sm:block">
                            Property Rental
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/favorites"
                            className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <HiHeart className="text-xl" />
                            <span>Favorites</span>
                            {favorites.length > 0 && (
                                <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {favorites.length}
                                </span>
                            )}
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:scale-110 transition-transform duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <HiMoon className="text-xl" /> : <HiSun className="text-xl" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <HiMoon className="text-xl" /> : <HiSun className="text-xl" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 animate-fade-in">
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/favorites"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
                            >
                                <span className="flex items-center space-x-2">
                                    <HiHeart className="text-xl" />
                                    <span>Favorites</span>
                                </span>
                                {favorites.length > 0 && (
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {favorites.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
