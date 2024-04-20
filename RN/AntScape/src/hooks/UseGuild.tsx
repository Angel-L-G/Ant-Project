import React, { useContext, useEffect, useState } from 'react'
import Globals from '../components/Globals';
import axios from 'axios';
import { Guild, GuildUser } from '../types/GuildTypes';
import { AppContext } from '../context/AppContextProvider';

const UseGuild = () => {
    const {ruta} = Globals();
    const [guidls, setGuidls] = useState();
    const { token, user } = useContext(AppContext);

    useEffect(() => {
        findAllGuilds();      
    }, [])
    

    async function findAllGuilds() {
        try {
            const response = await axios.get(ruta + "/v2/guilds", { headers : { "Authorization": "Bearer " + token }});

            setGuidls(response.data);
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
        }
    }

    async function findGuildById(id: number): Promise<Guild | undefined> {
        try {
            const response = await axios.get(ruta + "/v2/guilds/" + id, { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    async function findGuildUsersByGuildId(id: number): Promise<Array<GuildUser> | undefined>  {
        try {
            const response = await axios.get(ruta + "/v2/guilds/" + id + "/users", { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    async function kickPlayer(idGuild: number, idKkicked: number){
        try {
            const response = await axios.put(ruta + "/v2/guilds/" + idGuild + "/kick/users/" + idKkicked, { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    async function joinGuild(id: number){
        try {
            const response = await axios.put(ruta + "/v2/guilds/" + id + "/joinguild", { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    async function giveOwnership(id: number, idNewLeader: number){
        try {
            const response = await axios.put(ruta + "/v2/guilds/" + id + "/giveOwnership/" + idNewLeader, { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }
    
    async function leaveGuild(id: number){
        try {
            const response = await axios.put(ruta + "/v2/guilds/" + id, { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    async function createGuild(guildName: string, guildDescription: string){
        try {
            const response = await axios.post(ruta + "/v2/guilds", { 
                headers : { "Authorization": "Bearer " + token },
                params: {
                    guildName: guildName,
                    guildDescription: guildDescription
                }
            });

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    async function levelUpGuildLevel(id: number, levelName: string){
        try {
            const response = await axios.put(ruta + "/v2/guilds/" + id + "/levelUp/" + levelName, { headers : { "Authorization": "Bearer " + token }});

            return response.data;
        } catch (error) {
            console.log("Find All Guilds Error: " + error);
            return undefined;
        }
    }

    return {
        guidls,
        findAllGuilds,
        findGuildById,
        findGuildUsersByGuildId,
        kickPlayer,
        joinGuild,
        giveOwnership,
        leaveGuild,
        createGuild,
        levelUpGuildLevel,
    }
}

export default UseGuild