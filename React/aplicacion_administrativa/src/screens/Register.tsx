import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Register = (props: Props) => {
    const navigate = useNavigate();

    function login() {
        navigate("/main");
    }

    return (
        <div className='login'>
            <div className='formTitle'>
                <h1 style={{ color: "#198653", fontWeight: 'bold', fontSize: 50 }}>REGISTER</h1>
            </div>
            <div className='registerContent'>
                <Form className='loginForm' method='POST' onSubmit={() => login()}>
                    <Form.Group className="div" controlId="formBasicEmail">
                        <Form.Label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Nick: </Form.Label>
                        <Form.Control type="text" placeholder="Nick" style={{ width: 200 }} />
                    </Form.Group>

                    <Form.Group className="div" controlId="formBasicPassword">
                        <Form.Label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" style={{ width: 200 }} />
                    </Form.Group>

                    <Form.Group className="div" controlId="formBasicPassword">
                        <Form.Label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Email: </Form.Label>
                        <Form.Control type="email" placeholder="Email" style={{ width: 200 }} />
                    </Form.Group>
                    <Button variant="success" type="submit" style={{ marginTop: 30, marginBottom: 30 }}>Login</Button>
                    <a href='/login'>Login</a>
                </Form>
            </div>
        </div>
    )
}

export default Register