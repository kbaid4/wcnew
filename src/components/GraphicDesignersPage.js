import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import styles from './HotelsListPage.module.css';

const graphicDesignersData = [
  { 
    name: 'Creative Design Studio', 
    location: 'Downtown', 
    rating: 4.8, 
    image: '/images/venues/21.png',
  },
  { 
    name: 'Pixel Perfect Designs', 
    location: 'Arts District', 
    rating: 4.6, 
    image: '/images/venues/21.png',
  },
  { 
    name: 'Visual Impact Creatives', 
    location: 'City Center', 
    rating: 4.7, 
    image: '/images/venues/21.png',
  },
  { 
    name: 'Design Hub Co.', 
    location: 'Uptown', 
    rating: 4.5, 
    image: '/images/venues/21.png',
  }
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

const GraphicDesignersPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const navigate = useNavigate();

  let filtered = graphicDesignersData.filter(designer =>
    designer.name.toLowerCase().includes(search.toLowerCase()) ||
    designer.location.toLowerCase().includes(search.toLowerCase())
  );
  
  if (sort === 'name') {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'rating') {
    filtered = filtered.sort((a, b) => b.rating - a.rating);
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
            <button 
              key={item.name} 
              className={styles['nav-btn']} 
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className={styles['nav-section']}>
          {rightNavItems.map(item => (
            <button 
              key={item.name} 
              className={styles['nav-btn']} 
              onClick={() => navigate(item.path)}
            >
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
          placeholder="Search graphic designers..." 
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
        {filtered.length === 0 ? (
          <div style={{ color: '#441752', fontWeight: 500, fontSize: 18, marginTop: 40 }}>
            No graphic designers found.
          </div>
        ) : (
          filtered.map((designer, idx) => (
            <div 
              key={idx} 
              className={styles['hotel-card']} 
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/SuppliersProfile')}
            >
              <img 
                src={process.env.PUBLIC_URL + designer.image} 
                alt={designer.name} 
                className={styles['hotel-image']} 
              />
              <h2 className={styles['hotel-name']}>{designer.name}</h2>
              <div className={styles['hotel-location']}>{designer.location}</div>
              <div className={styles['hotel-rating']}>
                {Array(5).fill('').map((_, i) => (
                  <span key={i} style={{ color: i < Math.floor(designer.rating) ? '#FFD700' : '#ccc' }}>★</span>
                ))}
                <span style={{ marginLeft: '5px' }}>{designer.rating}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GraphicDesignersPage;
