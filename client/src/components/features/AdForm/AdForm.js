import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AdForm = ({ action, actionText, ...props }) => {
  const id = props.id;
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [photo, setPhoto] = useState(props.photo || null);
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');

  const dateNow = new Date(Date.now());
  const date = dateNow.toLocaleDateString();

  const navigate = useNavigate();

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    action({ title, content, photo, price, location, date, id });
    navigate('/');
  };

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <h1>{actionText} Ad</h1>
      <Form.Group>
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
      <Form.Group>
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
      <Form.Group>
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
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          {...register('content', { required: true, minLength: 20, maxLength: 1000})}
          as='textarea'
          rows='8'
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
      <Form.Group>
        <Form.Label>Add photo</Form.Label>
        <Form.Control
          type='file'
          onChange={e => setPhoto(e.target.files[0])}
        />
      </Form.Group>
      <Button type='submit' as='input' value='Submit' className='mt-3' variant='secondary'></Button>
    </Form>
  );
};

export default AdForm;