import "../styles/main.css"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import UseInformation from '../hook/UseInformation'
import UseMutation from '../hook/UseMutation'
import FormSaveUser from '../components/FormSaveUser'
import FormUpdateuser from '../components/FormUpdateuser'
import UserCard from '../components/UserCard'
import { Usuario } from '../type/types'
import { useEffect, useRef, useState } from "react"
import { GraphqlSaveInputDTO, GraphqlUpdateInputDTO } from "../type/typesGraphql"

const Main = () => {
    const { users, setLoginInfo, setRegisterInfo, findAllUser, findLoginDates, findRegisterDates, } = UseInformation();

    const [showForm, setShowForm] = useState(true);
    const [loginLoading, setLoginLoading] = useState(true);
    const [registerLoading, setRegisterLoading] = useState(true);
    const usersLoading = useRef(false);

    const [selectedUser, setSelectedUser] = useState<any>();
    const [userList, setUserList] = useState<Array<Usuario>>([]);
    const { deleteUserMutation, UpdateUserMutation, saveUserMutation } = UseMutation();

    const loginInfo = [
        { date: '2023-01-01', count: 10 },
        { date: '2023-01-02', count: 20 },
        { date: '2023-01-03', count: 30 },
        // Añadir más datos según sea necesario
    ];

    const registerInfo = [
        { date: '2023-05-01', count: 15 },
        { date: '2023-05-02', count: 22 },
        { date: '2023-05-03', count: 30 },
        { date: '2023-05-04', count: 45 },
        { date: '2023-05-05', count: 50 },
        { date: '2023-05-06', count: 55 },
        { date: '2023-05-07', count: 65 },
        { date: '2023-05-08', count: 70 },
        { date: '2023-05-09', count: 80 },
        { date: '2023-05-10', count: 95 },
    ];

    useEffect(() => {
        fetchLoginData();
        fetchRegisterData();
    }, [])

    useEffect(() => {
        findAllUser();
        setUserList(users);
    }, [users]);

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

    const saveUser = async (u: GraphqlSaveInputDTO) => {
        try {
            await saveUserMutation(u);
            findAllUser();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async (u: GraphqlUpdateInputDTO) => {
        try {
            await UpdateUserMutation(u);
            findAllUser();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            await deleteUserMutation(userId);
            setUserList(prevList => prevList.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchLoginData = async () => {
        try {
            const result = await findLoginDates();
            setLoginInfo(result.data.findLastLogins);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    async function fetchRegisterData() {
        try {
            const result = await findRegisterDates();
            setRegisterInfo(result.data.findRegisterAlongTime);
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
                        <h4>Cambiar Formulario</h4>
                        <label className="switch">
                            <input type="checkbox" checked={showForm} onChange={toggleForm} />
                            <span className="slider"></span>
                        </label>
                        
                    </div>
                    {(showForm)
                        ? <FormSaveUser saveUser={saveUser} />
                        : <FormUpdateuser updateUser={updateUser} />
                    }
                </nav>
                <main className="main">
                    <div className="content">
                        <div className="chartContainer">
                            <h2>Contenido Principal</h2>
                            <div>
                                <h3>Logins</h3>
                                {(loginLoading)
                                    ?<LineChart width={900} height={250} data={loginInfo}>
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
                                <h3>Registers</h3>
                                {(registerLoading)
                                    ?<LineChart width={900} height={250} data={registerInfo}>
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
                            {(usersLoading.current) 
                                ?<p>Loading...</p>
                                :<div>{userList.map((usuario) => (
                                    <UserCard key={usuario.id} usuario={usuario} deleteUser={deleteUser} />
                                ))}</div>
                            }
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