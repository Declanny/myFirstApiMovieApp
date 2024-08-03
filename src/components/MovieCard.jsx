import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCard = ({ id, title, imgUrl, description, rating }) => {
  const navigate = useNavigate();

  const styles = {
    image: {
      width: '100%',
      height: '400px',
    },
    container: {
      width: '400px',
      border: '1px solid black',
      borderRadius: '10px',
      margin: '10px',
      padding: '10px',
      cursor: 'pointer',
    },
  };

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <img
        src={
          imgUrl ||
          'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg'
        }
        alt="image "
        style={styles.image}
      />
      <h3>{title || 'Movie Title'}</h3>
      <p>{description}</p>
      <h3>Rating: {rating}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.any,
  imgUrl: PropTypes.string,
  rating: PropTypes.any,
  title: PropTypes.string,
};

export default MovieCard;
