import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import "../styles/main.css"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import UseInformation from '../hook/UseInformation'
import UseMutation from '../hook/UseMutation'
import FormSaveUser from '../components/FormSaveUser'
import FormUpdateuser from '../components/FormUpdateuser'
import UserCard from '../components/UserCard'
import { Usuario } from '../type/types'

const Main = () => {
    const { users, findAllUser, findLoginDates, finduserInfoById, findRegisterDates } = UseInformation();
    const { UpdateUserMutation, deleteUserMutation, saveUserMutation } = UseMutation();

    const [showForm, setShowForm] = useState(true);

    const [loginInfo, setLoginInfo] = useState();
    const [loginLoading, setLoginLoading] = useState(true);

    const [registerInfo, setRegisterInfo] = useState();
    const [registerLoading, setRegisterLoading] = useState(true);

    useEffect(() => {
        fetchLoginInfo();
        fetchRegisterInfo();
    }, [])

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

    async function fetchLoginInfo() {
        const data = await findLoginDates();

        setLoginInfo(data);

        setLoginLoading(false);
    }

    async function fetchRegisterInfo() {
        const data = await findRegisterDates();

        setRegisterInfo(data);

        setRegisterLoading(false);
    }

    function openModal(pos: number) {
        
    }

    return (
        <div className="App">
            <header className="header">
                <h1>AntScape</h1>
            </header>
            <div className="container">
                <nav className="nav">
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" checked={showForm} onChange={toggleForm} />
                            <span className="slider"></span>
                        </label>
                        <label>Mostrar Formulario</label>
                    </div>
                    {(showForm)
                        ? <FormSaveUser />
                        : <FormUpdateuser />
                    }
                </nav>
                <main className="main">
                    <div className="content">
                        <h2>Contenido Principal</h2>
                        <div>
                            <div>
                                {(loginLoading)
                                    ?<LineChart width={500} height={300} data={loginInfo}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                    </LineChart>
                                    :<p>Loading...</p>
                                }
                            </div>
                            <div>
                                {(loginLoading)
                                    ?<LineChart width={500} height={300} data={registerInfo}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                    </LineChart>
                                    :<p>Loading...</p>
                                }
                            </div>
                        </div>

                        <div className="sidebar">
                            <h3>Lista de Elementos</h3>
                            {Array.isArray(users) && users.map((usuario: Usuario, index: number) => (
                                <button key={index} onClick={() => openModal(index)}>
                                    <UserCard usuario={usuario} />
                                </button>
                            ))}
                        </div>
                    </div>
                </main>

            </div>
            <footer className="footer">
                <p>&copy; 2024 Mi Empresa</p>
            </footer>
        </div>
    )
}

export default Main

{/*
<div style={{ width: "100%", height: "100%"}}>
            <div className='header'>
                <h1 className='titleText'>
                    AntScape
                </h1>
                {
                    //ICONO
                }
            </div>

            <div className='container'>
                <div className='nav'>
                    <ul>
                        <li className='listText'>Save User</li>
                        <li className='listText'>Update User</li>
                        <li className='listText'>Delete User</li>
                    </ul>
                </div>

                <div className='chartsContainer'>
                    <div>
                        {(loginLoading)
                            ?<LineChart width={500} height={300} data={loginInfo}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                            </LineChart>
                            :<LineChart width={500} height={300}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                            </LineChart>
                        }
                    </div>
                    <div>
                        {(loginLoading)
                            ?<LineChart width={500} height={300} data={registerInfo}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                            </LineChart>
                            :<LineChart width={500} height={300}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                            </LineChart>
                        }
                    </div>
                </div>
            </div>

            <div className='footer'>
                <h1>
                    Foot
                </h1>
            </div>
        </div>
*/}

{/*
<Accordion>
    <Accordion.Item eventKey="0" style={{ backgroundColor: "blue !important" }}>
        <Accordion.Header style={{ backgroundColor: "blue !important" }}>Hola 1</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: "blue" }}>
            <a href='/Hola 1-1' style={{ display: 'block' }}>Hola 1-1</a>
            <a href='/Hola 1-2' style={{ display: 'block' }}>Hola 1-2</a>
            <a href='/Hola 1-3' style={{ display: 'block' }}>Hola 1-3</a>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1" style={{ backgroundColor: "blue !important" }}>
        <Accordion.Header style={{ backgroundColor: "blue !important" }}>Hola 2</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: "blue" }}>
            <a href='/Hola 2-1' style={{ display: 'block' }}>Hola 2-1</a>
            <a href='/Hola 2-2' style={{ display: 'block' }}>Hola 2-2</a>
            <a href='/Hola 2-3' style={{ display: 'block' }}>Hola 2-3</a>
        </Accordion.Body>
    </Accordion.Item>
</Accordion>
*/}