import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import UseSesion from '../hook/UseSesion';
import { UserLogin } from '../type/types';
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import Globals from '../assets/Globals';

type Props = {}

const Login = (props: Props) => {
    const { setUser, setToken, token } = useContext(AppContext);
    const { ruta } = Globals();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function logIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let user: UserLogin = {
            nombre: username,
            password: password
        }

        try {
            console.log(user);

            const response = await axios.post("http://localhost:8080/api/v1/login", user);
            console.log(response.data);

            if (response.status > 199 && response.status < 300) {
                const responseGet = await axios.get(ruta + "v2/users/me", { headers: { "Authorization": "Bearer " + response.data } });
                console.log(responseGet.data);

                setUser(responseGet.data);
                setToken(response.data);

                navigate("/main");
            } else {
                if (response.status === 428) {
                    console.log("Falta Validar");
                }
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("a");
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                <form className='loginForm' onSubmit={logIn}>
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

export default Login;
