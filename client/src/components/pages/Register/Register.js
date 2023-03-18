import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { Alert } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const Register = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('avatar', avatar);

        const options = {
            method: 'POST',
            body: fd
        };

        fetch(`${API_URL}/auth/register`, options)
    };

    return (
        <Form className="col-12 col-sm-3 mx-auto">
            <h1 className='my-4'>Sign up</h1>

            <Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>You have been successfully registered! You can now log in...</p>
            </Alert>

            <Alert variant="danger">
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>Unexpected error... Try again!</p>
            </Alert>

            <Alert variant="danger">
                <Alert.Heading>No enough data</Alert.Heading>
                <p>You have to fill all the fields.</p>
            </Alert>

            <Alert variant="warning">
                <Alert.Heading>Login already in use</Alert.Heading>
                <p>You have to use other login.</p>
            </Alert>

            <Spinner animation="border" role="status" className="block mx-auto">
                <span className="visually-hiden">Loading...</span>
            </Spinner>

            <Form.Group className='mb-3' controlId='formLogin' onSumbit={handleSubmit}>
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPhone'>
                <Form.Label>Phone numebr</Form.Label>
                <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formFile'>
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            
        </Form>
    );
};

export default Register;
