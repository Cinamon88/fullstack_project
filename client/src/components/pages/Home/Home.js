import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../features/Spinner/Spinner';
import SearchBar from '../../features/SearchBar/SearchBar';
import { API_URL } from '../../../config';
import { updateAds } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import AdBox from '../../features/AdBox/AdBox';

const Home = () => {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    handleUpdate();
    if (user) {
      fetch(API_URL + '/auth/user/' + user.login).then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            dispatch(getUser(data._id));
          });
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    setPending(true);
    fetch(API_URL + '/ads').then((res) => {
      if (res.status === 200) {
        return res.json().then((ads) => {
          dispatch(updateAds(ads));
          setPending(false);
        });
      }
    });
  };

  return (
    <>
      <SearchBar />
      {pending && <Spinner />}
      {!pending && <AdBox />}
    </>
  );
};

export default Home;