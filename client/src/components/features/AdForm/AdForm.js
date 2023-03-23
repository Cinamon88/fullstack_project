import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';

const AdForm = ({ action, actionText, ...props }) => {
  const updateDate = new Date();

  const id = props.id;
  const [price, setPrice] = useState(props.price || '');
  const [title, setTitle] = useState(props.title || '');
  const [localization, setLocalization] = useState(props.localization || '');
  const [description, setDescription] = useState(props.description || '');
  const [date, setDate] = useState(props.date || updateDate);
  const [image, setImage] = useState(props.image || '');
  const [phoneNumber, setPhone] = useState(props.phoneNumber || '');
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    if (description && date) {
      action({
        price,
        title,
        user: props.user,
        date: date,
        description,
        localization,
        id,
        image,
        phoneNumber,
      });
    }
  };

  return (
    <Form
      className="col-12 col-sm-3 mx-auto mt-3"
      onSubmit={validate(handleSubmit)}
    >
      <h1 className="my-4">{actionText} Ads</h1>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          {...register('price', { required: true })}
          type="number"
          value={price}
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && (
          <small className="d-block form-text text-danger mt-2">
            This field is required and accept only numbers.
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', {
            required: true,
            minLength: 10,
            maxLength: 50,
          })}
          value={title}
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            This field is required and has to be between 10 to 50 characters
            long.
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLocalization">
        <Form.Label>Localization</Form.Label>
        <Form.Control
          {...register('localization', {
            required: true,
            minLength: 2,
          })}
          value={localization}
          type="text"
          placeholder="Enter localization"
          onChange={(e) => setLocalization(e.target.value)}
        />
        {errors.localization && (
          <small className="d-block form-text text-danger mt-2">
            This field is required.
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...register('description', {
            required: true,
            minLength: 20,
            maxLength: 1000,
          })}
          value={description}
          as="textarea"
          rows="5"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <small className="d-block form-text text-danger mt-2">
            This field is required and has to be between 20 to 1000 characters
            long.
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Add image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button className="mt-3" as="input" type="submit" value="Submit"></Button>{' '}
    </Form>
  );
};
export default AdForm;