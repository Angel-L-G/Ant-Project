import React from 'react'

type Props = {}

const Globals = () => {
    const graphqlRuta = "http://192.168.1.6:8080/graphql";
    const ruta = "http://192.168.1.6:8080/api/";
    const ip = "192.168.1.6:8080";

    return {
        ruta,
        ip,
        graphqlRuta
    }
}

export default Globals