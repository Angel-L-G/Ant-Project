import React, { useContext } from 'react'
import axios from 'axios';
import Query from '../assets/Query';
import Globals from '../assets/Globals';
import { AppContext } from '../context/AppContextProvider';

const UseInformation = () => {
    const {findAllUsers, findLastLogins, findRegisterAlongTime} = Query();
    const {token} = useContext(AppContext);
    const {ruta} = Globals();


    async function finduserInfoById(id: number) {
        const query = 'findAdministrativeInfoByUserId(userId: ' + id + ') {' 
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

    async function findAllUser() {
        try {
            const response = await axios.post(ruta, {query:  findAllUsers}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function findLoginDates() {
        try {
            const response = await axios.post(ruta, {query:  findLastLogins}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function findRegisterDates() {
        try {
            const response = await axios.post(ruta, {query:  findRegisterAlongTime}, {headers: { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        finduserInfoById,
        findAllUser,
        findLoginDates,
        findRegisterDates,
    }
}

export default UseInformation