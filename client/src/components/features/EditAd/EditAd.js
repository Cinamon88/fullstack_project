import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { getAdById } from '../../../redux/adsRedux';
import AdForm from '../AdForm/AdForm';

const EditAds = () => {
  const adId = useParams();
  const id = adId.id;
  const navigate = useNavigate();


  const adData = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    console.log(ad);
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('price', ad.price);
    fd.append('localization', ad.localization);
    fd.append('phoneNumber', ad.phoneNumber);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'PUT',
      body: fd,
      credentials: 'include',
    };

    fetch(API_URL + '/api/ads/' + id, options).then((res) => {
      if (res.status === 200) {
        setTimeout(() => navigate('/'), 2000);
      }
    });
  };

  return (
    <AdForm
      action={handleSubmit}
      actionText="Edit"
      price={adData.price}
      title={adData.title}
      localization={adData.localization}
      description={adData.description}
      date={adData.date}
      image={adData.image}
      phoneNumber={adData.user.phoneNumber}
      user={adData.user._id}
      id={id}
    />
  );
};

export default EditAds;