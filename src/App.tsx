import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Search } from './components/Search';
import { Results } from './components/Results';
import './App.css';

// Movie type - structure of movie data
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

// API response type
interface MoviesResponse {
  results: Movie[];
}

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE_URL = 'https://api.themoviedb.org/3';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldThrowError, setShouldThrowError] = useState<boolean>(false);

  // Load popular movies initially
  useEffect(() => {
    fetchMovies('');
  }, []);

  const fetchMovies = async (term: string) => {
    setLoading(true);
    setError(null);
    setSearchTerm(term);

    try {
      const url = term.trim()
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(term)}&page=1`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MoviesResponse = await response.json();

      if (data.results.length === 0 && term.trim()) {
        throw new Error(`No movies found for "${term}"`);
      }

      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  if (shouldThrowError) {
    throw new Error('Test error thrown by user - Error Boundary should catch this!');
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <Film className="w-8 h-8 text-blue-600" />
            Movies Search
          </h1>
          <p className="app-subtitle">
            Search for your favorite movies or browse popular titles — built with React Class Components and TheMovieDB API
          </p>
        </header>

        <Search onSearch={fetchMovies} initialValue={searchTerm} />
        <Results movies={movies} loading={loading} error={error} />

        <button
          className="test-error-btn"
          onClick={() => setShouldThrowError(true)}
        >
          Test Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default App;
