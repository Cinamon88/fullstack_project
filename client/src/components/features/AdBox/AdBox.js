import React from 'react';
import styles from './AdBox.module.scss';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';

const AdBox = ({ title, price, localization, image, _id, user }) => {
  return (
    <Card className={styles.card_wrapper}>
      <Card.Img
        variant="top"
        src={IMGS_URL + image}
        className={styles.card_image}
      />
      <Card.Body>
        <div className={styles.body}>
          <Card.Title>Price: {price}$</Card.Title>
          <Card.Subtitle className="my-3">
            <b>{title}</b>
          </Card.Subtitle>
          <Card.Text className="mb-3">
            <b>Localization: {localization}</b>
          </Card.Text>
        </div>
        <Row>
          <Col>
            <Link to={'/ads/' + _id}>
              <Button className={styles.button} variant="primary">
                Read more
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AdBox;