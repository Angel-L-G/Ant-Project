import axios from 'axios';
import React, { useContext } from 'react'
import Globals from '../assets/Globals';
import { AppContext } from '../context/AppContextProvider';
import { GraphqlSaveInputDTO, GraphqlUpdateInputDTO } from '../type/typesGraphql';

const UseMutation = () => {
    const {graphqlRuta} = Globals();
    const {token} = useContext(AppContext);
    const updatearUser = '';

    async function saveUserMutation(u: GraphqlSaveInputDTO) {
        const query = 'mutation { ' +
            'saveUser(' +
                'user: { ' +
                    'active: ' + u.active + ', ' +
                    'eggs: ' + u.eggs + ', ' +
                    'email: ' + u.email + ', ' +
                    'goldenEggs: ' + u.goldenEggs + ', ' +
                    'img: ' + u.img + ', ' +
                    'name: ' + u.name + ', ' +
                    'password: ' + u.password + ', ' +
                    'rol: ' + u.rol + '} , ' +
            ') {' +
                'msg' +
                'name' +
                'status' +
            '}' +
        '}';

        try {
            const response = await axios.post(graphqlRuta, {query:  query}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function UpdateUserMutation(u: GraphqlUpdateInputDTO) {
        const query = 'mutation { ' +
            'updatearUser( ' +
                'user: { ' +
                    'active: ' + u.active + ',' + 
                    'eggs: ' + u.eggs + ',' +  
                    'email: ' + u.email + ',' +
                    'goldenEggs: ' + u.goldenEggs + ',' +
                    'id: ' + u.id + ',' +  
                    'img: ' + u.img + ',' +
                    'password: ' + u.password + ',' +
                    'name: ' + u.name + 
                '}' +
            ') {' +
                'msg' +
                'name' +
                'status' +
            '}' +
        '}';

        try {
            const response = await axios.post(graphqlRuta, {query:  query}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteUserMutation(id: number) {
        const query = 'mutation { ' +
            'deleteUser(id: ' + id + ') { ' +
                'msg' +
                'name' +
                'status' +
            '}' +
        '}';

        try {
            const response = await axios.post(graphqlRuta, {query:  query}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        saveUserMutation,
        UpdateUserMutation,
        deleteUserMutation,
    }
}

export default UseMutation