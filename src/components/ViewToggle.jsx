import { HiViewGrid, HiViewList } from 'react-icons/hi';

export default function ViewToggle({ viewMode, onViewChange }) {
    return (
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button
                onClick={() => onViewChange('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                aria-label="Grid view"
            >
                <HiViewGrid className="text-xl" />
            </button>
            <button
                onClick={() => onViewChange('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                        ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                aria-label="List view"
            >
                <HiViewList className="text-xl" />
            </button>
        </div>
    );
}
