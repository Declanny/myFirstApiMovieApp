import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Filter from './Filter';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4833eb2749msh1f232a2d6d0d6b1p169a02jsncdb78cfcfb2f',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data); // Initialize filteredMovies with all movies
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    if (passesFilters(newMovie)) {
      setFilteredMovies([...filteredMovies, newMovie]);
    }
  };

  const handleFilter = (filterType, value) => {
    if (filterType === 'title') {
      setTitleFilter(value);
    } else if (filterType === 'rating') {
      setRatingFilter(value);
    }
    // Apply filters after setting the new filter values
    filterMovies(value, filterType === 'rating' ? value : ratingFilter, filterType === 'title' ? value : titleFilter);
  };

  const filterMovies = (title, rating) => {
    const filtered = movies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(title.toLowerCase()) &&
        movie.rating >= rating
      );
    });
    setFilteredMovies(filtered);
  };

  const passesFilters = (movie) => {
    return (
      movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      movie.rating >= ratingFilter
    );
  };

  const styles = {
    pageContainer: {
      backgroundColor: '#333',
      color: '#fff',
      minHeight: '100vh',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    movieListContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    addButton: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.header}>GoMyFlix</h1>
      <Filter onFilter={handleFilter} />
      <div style={styles.movieListContainer} className="movie-list">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imgUrl={movie.image}
            description={movie.description}
            rating={movie.rating}
          />
        ))}
      </div>
      <button
        style={styles.addButton}
        onClick={() =>
          handleAddMovie({
            id: movies.length + 1,
            title: 'New Movie',
            image: 'https://via.placeholder.com/300',
            description: 'Description of the new movie',
            rating: 7.5
          })
        }
      >
        Add New Movie
      </button>
    </div>
  );
};

export default MovieList;
