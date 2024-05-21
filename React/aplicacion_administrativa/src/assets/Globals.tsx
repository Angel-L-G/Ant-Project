import React from 'react'

type Props = {}

const Globals = () => {
    const graphqlRuta = "http://localhost:8080/graphql";
    const ruta = "http://localhost:8080/api/";
    const ip = "localhost:8080";

    return {
        ruta,
        ip,
        graphqlRuta
    }
}

export default Globals