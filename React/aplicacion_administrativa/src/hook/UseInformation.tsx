import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Query from '../assets/Query';
import Globals from '../assets/Globals';
import { AppContext } from '../context/AppContextProvider';

const UseInformation = () => {
    const {findAllUsers, findLastLogins, findRegisterAlongTime} = Query();
    const {token} = useContext(AppContext);
    const {ruta} = Globals();
    const [users, setUsers] = useState([]);
    const [loginInfo, setLoginInfo] = useState();
    const [registerInfo, setRegisterInfo] = useState();

    useEffect(() => {
        findAllUser();
    }, [])
    

    async function finduserInfoById(id: number) {
        const query = 'findAdministrativeInfoByUserId(userId: ' + id + ') {' +
            'createdAt' +
            'id' +
            'lastLogin' +
            'updatedAt' +
        '}';

        try {
            const response = await axios.post(ruta, {query:  query}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const findAllUser = async () => {
        const query = `
            query {
                findAllUsers {
                    active
                    banned
                    eggs
                    email
                    hash
                    id 
                    img 
                    name
                    rol 
                    goldenEggs 
                }
            }
        `;
    
        try {
            const response = await axios.post('http://localhost:8080/graphql', {
                query,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log("Users: ");
            console.log(response.data.data.findAllUsers);
            setUsers(response.data.data.findAllUsers)
        } catch (error) {
            console.error('GraphQL request error:', error);
            throw error;
        }
    };

    const findLoginDates = async () => {
        const query = `
            query($aux: String!) {
                findLastLogins(aux: $aux) {
                    date
                    count
                }
            }
        `;
    
        const variables = {
            aux: 'a',  // Valor estático para 'aux'
        };
    
        try {
            const response = await axios.post('http://localhost:8080/graphql', {
                query,
                variables,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('GraphQL request error:', error);
            throw error;
        }
    };

    const findRegisterDates = async () => {
        const query = `
            query($ok: Boolean!) {
                findRegisterAlongTime(ok: $ok) {
                    date
                    count
                }
            }
        `;
    
        const variables = {
            ok: true,  // Valor booleano para 'ok'
        };
    
        try {
            const response = await axios.post('http://localhost:8080/graphql', {
                query,
                variables,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('GraphQL request error:', error);
            throw error;
        }
    };

    return {
        finduserInfoById,
        findAllUser,
        findLoginDates,
        findRegisterDates,
        setLoginInfo,
        setRegisterInfo,
        loginInfo,
        registerInfo,
        users,
    }
}

export default UseInformation