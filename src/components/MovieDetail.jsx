import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  const fetchMovieDetail = async () => {
    const url = `https://imdb-top-100-movies.p.rapidapi.com/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4833eb2749msh1f232a2d6d0d6b1p169a02jsncdb78cfcfb2f',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie detail:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const styles = {
    container: {
      padding: '20px',
      color: '#fff',
      backgroundColor: '#333',
      minHeight: '100vh',
    },
    image: {
      width: '100%',
      height: '500px',
    },
    detailContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.detailContainer}>
        <img src={movie.image} alt={movie.title} style={styles.image} />
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <h3>Rating: {movie.rating}</h3>
      </div>
    </div>
  );
};

export default MovieDetail;
