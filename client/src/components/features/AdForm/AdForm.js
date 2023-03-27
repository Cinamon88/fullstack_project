import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AdForm = ({ action, actionText, ...props }) => {

  const navigate = useNavigate();

  const id = props.id;
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [photo, setPhoto] = useState(props.photo || null);
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');

  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();

  const dateString = `${day}.${month}.${year}`;

  const [date] = useState(props.date || dateString);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    action({ title, content, photo, price, location, date, id, user: props.user });
    navigate('/');
  };

  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }} className='col-10'>
        <Form onSubmit={validate(handleSubmit)}>

          <h1 className='my-4'>{actionText} Ad</h1>

          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register('title', { required: true, minLength: 10, maxLength: 50 })}
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {errors.title &&
              <small className='d-block form-text text-danger mt-2'>
                This field is required and should contain between 10 and 50 characters
              </small>
            }
          </Form.Group>

          <Row>
            <Form.Group as={Col} className='mb-3' controlId='formLocation'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                {...register('location', { required: true })}
                type='text'
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
              {errors.location &&
                <small className='d-block form-text text-danger mt-2'>
                  This field is required
                </small>
              }
            </Form.Group>

            <Form.Group as={Col} xs={{ span: 3 }} className='mb-3' controlId='formPrice'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                {...register('price', { required: true })}
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              {errors.price &&
                <small className='d-block form-text text-danger mt-2'>
                  This field is required and accept only numbers
                </small>
              }
            </Form.Group>

            <Form.Group as={Col} xs={{ span: 4 }} className='mb-3' controlId='formPhoto'>
              <Form.Label>Add photo</Form.Label>
              <Form.Control
                type='file'
                onChange={e => setPhoto(e.target.files[0])}
              />
            </Form.Group>
          </Row>

          <Form.Group className='mb-3' controlId='formContent'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              {...register('content', { required: true, minLength: 20, maxLength: 1000})}
              as='textarea'
              rows='5'
              type='text'
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            {errors.content &&
              <small className='d-block form-text text-danger mt-2'>
                This field is required and should contain between 20 and 1000 characters
              </small>
            }
          </Form.Group>

          <Button type='submit' as='input' value='Add' className='mt-3' variant='warning'></Button>

        </Form>
      </Col>
    </Row>
  );
};

export default AdForm;