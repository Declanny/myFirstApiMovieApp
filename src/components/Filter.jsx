import  { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleTitleFilterChange = (e) => {
    setTitleFilter(e.target.value);
    onFilter('title', e.target.value);
  };

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
    onFilter('rating', e.target.value);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <label style={{ marginRight: '10px', color: 'blue', marginLeft: '250px' }}>Title Filter:</label>
      <input
        type="text"
        value={titleFilter}
        onChange={handleTitleFilterChange}
        style={{
          padding: '5px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginRight: '10px',
          width: '200px'
        }}
      />
      <label style={{ marginRight: '10px', color: 'blue' }}>Rating Filter:</label>
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={ratingFilter}
        onChange={handleRatingFilterChange}
        style={{
          padding: '5px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '80px',
          color:  'black'
        }}
      />
    </div>
  );
};

export default Filter;
