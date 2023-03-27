import styles from "./Ad.module.scss";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { IMGS_URL, API_URL } from "../../../config";
import { getAdById, getAllAds } from "../../../redux/adsRedux";
import { Button, Col, Row, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { getUser } from "../../../redux/usersRedux";


const Ad = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleRemoveAd = e => {
    e.preventDefault();

    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}/ads/${ad._id}`, options)
      .then(res => {
        getAllAds();
      });

    toggle();
    navigate('/');
  };

  if(!ad) return <Navigate to='/' />
  if(user === null) return (<h1 className='text-center mt-5'>You must be logged...</h1>)
  else return (
    <div className={styles.adBox}>
      <Row>

        { user.id === ad.user._id &&
          <div className={`mt-4 ${styles.adButtons}`}>
            <Link to={`/ads/edit/${id}`}><Button variant='secondary' className='mx-3'>Edit</Button></Link>
            <Button variant='danger' onClick={toggle}>Delete</Button>
          </div>
        }

        <Modal show={modal} onHide={toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This operation will completely remove this post from the app.<br></br>
            Are you sure you want to do that?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRemoveAd}>Remove</Button>
          </Modal.Footer>
        </Modal>

        <h2 className='mt-3'>{ad.title}</h2>

        <Col>
          <img src={IMGS_URL + ad.photo} className={styles.adPhoto} alt='product' />
        </Col>

        <Col>
          <Row>
            <Col className='mt-5'>
              <p>Price: {ad.price}$</p>
              <p>Location: {ad.location}</p>
              <p>Date added: {ad.date}</p>
            </Col>
            <Col>
              <p>Seller:</p>
              <img src={IMGS_URL + ad.user.avatar} className={styles.userAvatar} alt='avatar' />
              <p className='mt-2'>{ad.user.login}</p>
              <p>{ad.user.phone}</p>
            </Col>
          </Row>
        </Col>

        <p className='mt-3'>{ad.content}</p>

      </Row>
    </div>
  );
};

export default Ad;