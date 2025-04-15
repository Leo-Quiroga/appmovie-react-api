
import { useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import './MovieApp.css';


export const MovieApp = () => {
    const [search, setSearch] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = 'APY_KEY';
    

    

    const fetchMovies = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`);
            if(!response.ok) throw new Error('Error en la respuesta');
            const data = await response.json();
            setMovieList(data.results || []);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [search, API_KEY, urlBase]);

    
    useEffect(() => {
        const timer = setTimeout(() => {
            if(search.trim().length > 2) {
                fetchMovies();
            }
        }, 500);
        
        return () => clearTimeout(timer);
    }, [search, fetchMovies]);

    return (
        <div className='container'>
            <header className="app-header">
                <h1 className="app-title">Cine<span>Tech</span></h1>
                <p className="app-subtitle">Descubre tu próxima película favorita</p>
            </header>
            
            <div className="search-container">
                <form onSubmit={(e) => { e.preventDefault(); fetchMovies(); }}>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder='Buscar películas...'
                            value={search}
                            onChange={({ target }) => setSearch(target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <i className="search-icon"></i>
                        </button>
                    </div>
                </form>
            </div>

            {isLoading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <p>⚠️ {error}</p>
                </div>
            )}

            {selectedMovie && (
                <MovieDetails 
                    movie={selectedMovie} 
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            {!isLoading && !error && movieList.length > 0 && (
                <div className='movie-list'>
                    {movieList.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie}
                            onClick={() => setSelectedMovie(movie)}
                        />
                    ))}
                </div>
            )}

            {!isLoading && !error && search && movieList.length === 0 && (
                <div className="no-results">
                    <p>No se encontraron resultados para `{search}`</p>
                </div>
            )}

            {!isLoading && !error && !search && (
                <FeaturedMovies onMovieSelect={setSelectedMovie} />
            )}
        </div>
    );
};

const MovieCard = ({ movie, onClick }) => (
    <div className='movie-card' onClick={onClick}>
        <div className="movie-poster-container">
            {movie.poster_path ? (
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    className="movie-poster"
                    loading="lazy"
                />
            ) : (
                <div className="poster-placeholder">
                    <span>{movie.title}</span>
                </div>
            )}
            <div className="movie-rating">
                ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
            </div>
        </div>
        <div className="movie-info">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-release">
                {movie.release_date?.split('-')[0] || 'Año desconocido'}
            </p>
        </div>
    </div>
);

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        overview: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

const MovieDetails = ({ movie, onClose }) => (
    <div className="movie-details-overlay">
        <div className="movie-details-container">
            <button className="close-button" onClick={onClose}>×</button>
            <div className="movie-details-content">
                <div className="details-poster">
                    {movie.poster_path ? (
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title}
                        />
                    ) : (
                        <div className="details-poster-placeholder">
                            <span>{movie.title}</span>
                        </div>
                    )}
                </div>
                <div className="details-info">
                    <h2>{movie.title} <span>({movie.release_date?.split('-')[0]})</span></h2>
                    <div className="details-meta">
                        <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
                        <span>🗓️ {movie.release_date}</span>
                    </div>
                    <p className="details-overview">{movie.overview || 'Descripción no disponible.'}</p>
                    <div className="details-actions">
                        <button className="watch-trailer">
                            ▶ Ver tráiler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        overview: PropTypes.string
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

const FeaturedMovies = ({ onMovieSelect }) => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
    const [featuredError, setFeaturedError] = useState(null);
    
    
    useEffect(() => {

        const API_KEY = 'APY_KEY'; 

        const fetchFeaturedMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
                );
                if (!response.ok) throw new Error('Error al cargar películas destacadas');
                const data = await response.json();
                setFeaturedMovies(data.results.slice(0, 16)); // Mostrar solo las 8 más populares
            } catch (error) {
                setFeaturedError(error.message);
                console.error('Error:', error);
            } finally {
                setIsLoadingFeatured(false);
            }
        };

        fetchFeaturedMovies();
    }, []);

    return (
        <div className="featured-movies">
            <h2 className="section-title">Películas Destacadas</h2>
            {isLoadingFeatured ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : featuredError ? (
                <div className="error-message">
                    <p>⚠️ {featuredError}</p>
                </div>
            ) : (
                <div className="movie-list">
                    {featuredMovies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie}
                            onClick={() => onMovieSelect(movie)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

FeaturedMovies.propTypes = {
    onMovieSelect: PropTypes.func.isRequired
};
