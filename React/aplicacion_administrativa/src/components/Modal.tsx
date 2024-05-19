import React, { useEffect, useState } from 'react'
import { Usuario } from '../type/types';
import UseInformation from '../hook/UseInformation';

type Props = {
    pos: number,
    closeModal: any
}

const Modal = ({ pos, closeModal }: Props) => {
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
    const { users } = UseInformation();

    useEffect(() => {
        if (users != undefined) {
            setUsuario(users[pos]);
        }
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Datos de Usuario</h2>
                <p>ID: {usuario.id}</p>
                <p>Activo: {usuario.active ? 'Sí' : 'No'}</p>
                <p>Baneado: {usuario.banned ? 'Sí' : 'No'}</p>
                <p>Eggs: {usuario.eggs}</p>
                <p>Email: {usuario.email}</p>
                <p>Golden Eggs: {usuario.goldenEggs}</p>
                <p>Hash: {usuario.hash}</p>
                <p>Imagen: {usuario.img}</p>
                <p>Nombre: {usuario.name}</p>
                <p>Contraseña: {usuario.password}</p>
                <p>Rol: {usuario.rol}</p>
                <p>Total Money Generated: {usuario.totalMoneyGenerated}</p>
            </div>
        </div>
    );
};



export default Modal