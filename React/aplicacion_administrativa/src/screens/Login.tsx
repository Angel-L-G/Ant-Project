import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import UseSesion from '../hook/UseSesion';

type Props = {}

const Login = (props: Props) => {
    const navigate = useNavigate();
    const {login} = UseSesion();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function forLogin() {
        login(username, password);
        navigate("/main");
    }

    const handleNameChange = (event: any) => {
        console.log("a");
        
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event: any) => {
        console.log("b");
        
        setPassword(event.target.value);
    };

    return (
        <div className='login'>
            <div className='formTitle'>
                <h1 style={{ color: "#198653", fontWeight: 'bold', fontSize: 50 }}>
                    LOGIN
                </h1>
            </div>
            <div className='loginContent'>
                <form className='loginForm' method='POST' onSubmit={forLogin}>
                    <div className="div">
                        <label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Name: </label>
                        <input type="text" placeholder="Nick" value={username} onChange={handleNameChange} style={{ width: 200 }} />
                    </div>

                    <div className="div">
                        <label style={{ width: 80, color: "#198653", fontWeight: 'bold' }}>Password: </label>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} style={{ width: 200 }} />
                    </div>

                    <button type="submit" className="button" style={{ marginTop: 30, marginBottom: 30 }}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login