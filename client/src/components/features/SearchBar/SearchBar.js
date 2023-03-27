import React from 'react';
import styles from './SearchBar.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const SearchBar = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.container}>
      <div>
        <input className={styles.input} type="text" />
        <Link to="/searchresult">
          <button className={styles.button}>Search</button>
        </Link>
      </div>
      {user && (
        <div>
          <Link to="/addAds">
            <button className={styles.button}>Add Ads</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchBar;