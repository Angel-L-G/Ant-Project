import axios from 'axios';
import React, { useContext } from 'react'
import Globals from '../assets/Globals';
import { AppContext } from '../context/AppContextProvider';
import { GraphqlSaveInputDTO, GraphqlUpdateInputDTO } from '../type/typesGraphql';
import UseInformation from './UseInformation';
import { Usuario } from '../type/types';

const UseMutation = () => {
    const {graphqlRuta} = Globals();
    const {users, usersLoading, findAllUser, setUsersLoading, setUsers} = UseInformation();
    const {token} = useContext(AppContext);

    const saveUserMutation = async (u: GraphqlSaveInputDTO) => {
        const query = `
            mutation($user: UsuarioSaveInputDTO!) {
                saveUser(user: $user) {
                    msg
                    name
                    status
                }
            }
        `;
    
        const variables = {
            user: {
                active: u.active,
                eggs: u.eggs,
                email: u.email,
                goldenEggs: u.goldenEggs,
                img: u.img,
                name: u.name,
                password: u.password,
                rol: u.rol,
            },
        };
    
        try {
            console.log('Variables:', JSON.stringify(variables, null, 2)); // Verifica las variables
    
            const response = await axios.post(
                graphqlRuta, // reemplaza con tu URL de endpoint
                {
                    query,
                    variables,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
    
            // Verifica si hay errores en la respuesta de GraphQL
            if (response.data.errors) {
                console.error('GraphQL validation errors:', response.data.errors);
                throw new Error('GraphQL validation error');
            }
    
            // Verifica y loguea el resultado para confirmar que todo está bien
            console.log(response.data.data.saveUser);
    
            setUsers(prevList => [...prevList, response.data.data.saveUser]);
    
        } catch (error) {
            console.error('GraphQL request error:', error);
            throw error;
        }
    };
    

    const UpdateUserMutation = async (u: GraphqlUpdateInputDTO) => {
        const query = `
            mutation($user: UsuarioInputGraphqlUpdateDTO!) {
                updatearUser(user: $user) {
                    msg
                    name
                    status
                }
            }
        `;
    
        const variables = {
            user: {
                id: u.id,
                name: u.name,
                email: u.email,
                password: u.password,
                img: u.img,
                active: u.active,
                eggs: u.eggs,
                goldenEggs: u.goldenEggs
            },
        };
    
        try {
            const response = await axios.post(graphqlRuta, {
                query,
                variables,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setUsers(prevList => 
                prevList.map(user => 
                    user.id === u.id ? { ...user, u } : user
                )
            );
        } catch (error) {
            console.error('GraphQL request error:', error);
            throw error;
        }
    };

    const deleteUserMutation = async (id: number) => {
        const query = `
            mutation($id: Int!) {
                deleteUser(id: $id) {
                    msg
                    name
                    status
                }
            }
        `;
    
        const variables = {
            id: id,
        };
    
        try {
            const response = await axios.post(graphqlRuta, {
                query,
                variables,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            return response.data; // Asegúrate de retornar el resultado para manejar la promesa
        } catch (error) {
            console.error('GraphQL request error:', error);
            throw error;
        }
    };

    return {
        saveUserMutation,
        UpdateUserMutation,
        deleteUserMutation,
    }
}

export default UseMutation