import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {
    const navigate = useNavigate();

    function login() {
        navigate("/main");
    }

    return (
        <div className='login'>
            <div className='formTitle'>
                <h1 style={{ color: "#198653", fontWeight: 'bold', fontSize: 50 }}>LOGIN</h1>
            </div>
            <div className='loginContent'>
                <Form className='loginForm' method='POST' onSubmit={() => login()}>
                    <Form.Group className="div" controlId="formBasicEmail">
                        <Form.Label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Name: </Form.Label>
                        <Form.Control type="text" placeholder="Nick" style={{ width: 200 }} />
                    </Form.Group>

                    <Form.Group className="div" controlId="formBasicPassword">
                        <Form.Label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" style={{ width: 200 }} />
                    </Form.Group>
                    
                    <Button variant="success" type="submit" style={{ marginTop: 30, marginBottom: 30 }}>Login</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login