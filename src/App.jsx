import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                <Router>
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/favorites" element={<FavoritesPage />} />
                        </Routes>
                    </div>
                </Router>
            </FavoritesProvider>
        </ThemeProvider>
    );
}

export default App;
