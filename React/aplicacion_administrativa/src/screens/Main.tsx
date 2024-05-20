import "../styles/main.css"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import UseInformation from '../hook/UseInformation'
import UseMutation from '../hook/UseMutation'
import FormSaveUser from '../components/FormSaveUser'
import FormUpdateuser from '../components/FormUpdateuser'
import UserCard from '../components/UserCard'
import { Usuario } from '../type/types'
import axios from 'axios'
import Globals from '../assets/Globals'
import Query from '../assets/Query'
import { AppContext } from '../context/AppContextProvider'
import { useContext, useEffect, useState } from "react"
import UserModal from "../components/Modal"
import styles from '../../../../RN/AntScape/src/themes/styles';

const Main = () => {
    const { users, loginInfo, registerInfo, setLoginInfo, setRegisterInfo, findAllUser, finduserInfoById, findLoginDates, findRegisterDates, } = UseInformation();
    const { UpdateUserMutation, deleteUserMutation, saveUserMutation } = UseMutation();
    const {graphqlRuta} = Globals();
    const {findLastLogins} = Query();
    const { token } = useContext(AppContext);

    const [showForm, setShowForm] = useState(true);
    const [loginLoading, setLoginLoading] = useState(true);
    const [registerLoading, setRegisterLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState<any>();

    useEffect(() => {
        fetchLoginData();
        fetchRegisterData();
    }, [])

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

    const fetchLoginData = async () => {
        try {
            const result = await findLoginDates();
            setLoginInfo(result.data.findLastLogins);
            console.log("Logins: ");
            console.log(result.data.findLastLogins);
            
                       
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    async function fetchRegisterData() {
        try {
            const result = await findRegisterDates();
            setRegisterInfo(result.data.findRegisterAlongTime);
            console.log("Registers: ");
            console.log(result.data.findRegisterAlongTime);
            
                       
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="App">
            <header className="header">
                <h1>AntScape</h1>
            </header>
            <div className="contenedor">
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
                        <div className="chartContainer">
                            <h2>Contenido Principal</h2>
                            <div>
                                {(loginLoading)
                                    ?<LineChart width={1000} height={450} data={loginInfo}>
                                        <XAxis dataKey="date"/>
                                        <YAxis dataKey="count"/>
                                        <Tooltip />
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                                    </LineChart>
                                    :<p>Loading...</p>
                                }
                            </div>
                            <div>
                                {(registerLoading)
                                    ?<LineChart width={1000} height={450} data={registerInfo}>
                                        <XAxis dataKey="date"/>
                                        <YAxis dataKey="count"/>
                                        <Tooltip />
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                                    </LineChart>
                                    :<p>Loading...</p>
                                }
                            </div>
                        </div>

                        <div className="sidebar">
                            <h3>Lista de Elementos</h3>
                            {users.map((usuario, index) => (
                                <UserCard usuario={usuario} />
                            ))}
                        </div>
                    </div>
                </main>

            </div>
            <footer className="footer">
                <p style={{alignItems: "center"}}>&copy; 2024 AntScape</p>
            </footer>

        </div>
    )
}

export default Main;