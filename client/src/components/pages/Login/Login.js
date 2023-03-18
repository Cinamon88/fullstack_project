import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { Alert } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null)   // status, loading, success, serverError, clientError
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                    dispatch(logIn({ login }));
                } else if (res.status === 400) {
                    setStatus('clientError');
                } 
                else {
                    setStatus('serverError');
                }
            })
            .catch(err => {
                setStatus('serverError');
            })
    }

    return (
        <Form className="col-12 col-sm-3 mx-auto">
            <h1 className='my-4'>Sign in</h1>

            {status === 'success' && (
            <Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>You have been successfully logged in!</p>
            </Alert>
            )}

            {status === 'serverError' && (
            <Alert variant="danger">
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>Unexpected error... Try again!</p>
            </Alert>
            )}

            {status === 'clientError' && (
            <Alert variant="danger">
                <Alert.Heading>Inccorrect data</Alert.Heading>
                <p>Login or password are incorrect..</p>
            </Alert>
            )}

            {status === 'loading' && (
            <Spinner animation="border" role="status" className="block mx-auto">
                <span className="visually-hiden">Loading...</span>
            </Spinner>
            )}

            <Form.Group className='mb-3' controlId='formLogin' onSubmit={handleSubmit}>
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Sign in
            </Button>

        </Form>
    );
};

export default Login;