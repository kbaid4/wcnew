import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import styles from './HotelsListPage.module.css';

// Dummy data for Event Decorators
const decoratorsData = [
  { 
    name: 'Elegant Affairs', 
    location: 'Downtown', 
    rating: 4.9, 
    image: '/images/venues/9.png'
  },
  { 
    name: 'Grand Decor', 
    location: 'City Center', 
    rating: 4.8, 
    image: '/images/venues/9.png'
  },
  { 
    name: 'Luxe Styling', 
    location: 'Uptown', 
    rating: 4.7, 
    image: '/images/venues/9.png'
  },
  { 
    name: 'Dream Decor', 
    location: 'West End', 
    rating: 4.8, 
    image: '/images/venues/9.png'
  },
  { 
    name: 'Vivid Events', 
    location: 'East District', 
    rating: 4.6, 
    image: '/images/venues/9.png'
  },
  { 
    name: 'Opulent Designs', 
    location: 'Theater District', 
    rating: 4.9, 
    image: '/images/venues/9.png'
  },
];

const mainNavItems = [
  { name: 'Home', path: '/SuppliersPage' },
  { name: 'Events', path: '/Events' },
  { name: 'Messages', path: '/MessagesPage' },
];

const rightNavItems = [
  { name: 'My Work', path: '/my-work' },
  { name: 'My Team', path: '/my-team' },
];

const EventDecoratorsPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const navigate = useNavigate();

  // Filtering and sorting logic
  let filteredDecorators = decoratorsData.filter(decorator =>
    decorator.name.toLowerCase().includes(search.toLowerCase()) ||
    decorator.location.toLowerCase().includes(search.toLowerCase())
  );
  
  if (sort === 'name') {
    filteredDecorators = filteredDecorators.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'rating') {
    filteredDecorators = filteredDecorators.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className={styles['app-container']}>
      <nav className={styles['top-nav']}>
        <div className={styles['nav-section']}>
          <img 
            src={process.env.PUBLIC_URL + '/images/landingpage/logo.png'} 
            alt="CITADA Logo" 
            className={styles['nav-logo']} 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer' }} 
          />
          {mainNavItems.map(item => (
            <button key={item.name} className={styles['nav-btn']} onClick={() => navigate(item.path)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className={styles['nav-section']}>
          {rightNavItems.map(item => (
            <button key={item.name} className={styles['nav-btn']} onClick={() => navigate(item.path)}>
              {item.name}
            </button>
          ))}
          <UserProfile showName={false} />
        </div>
      </nav>

      <div className={styles['hotels-toolbar']}>
        <input
          className={styles['search-input']}
          type="text"
          placeholder="Search event decorators..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles['filter-sort-group']}>
          <select 
            className={styles['sort-select']} 
            value={sort} 
            onChange={e => setSort(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className={styles['hotels-grid']}>
        {filteredDecorators.length === 0 ? (
          <div style={{ color: '#441752', fontWeight: 500, fontSize: 18, marginTop: 40 }}>
            No event decorators found.
          </div>
        ) : (
          filteredDecorators.map((decorator, idx) => (
            <div 
              key={idx} 
              className={styles['hotel-card']} 
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/SuppliersProfile')}
            >
              <img 
                src={process.env.PUBLIC_URL + decorator.image} 
                alt={decorator.name} 
                className={styles['hotel-image']} 
              />
              <h2 className={styles['hotel-name']}>{decorator.name}</h2>
              <div className={styles['hotel-location']}>{decorator.location}</div>
              <div className={styles['hotel-rating']}>Rating: {decorator.rating} ⭐</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventDecoratorsPage;
