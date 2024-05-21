import React from 'react'
import { Usuario } from '../type/types';
import UseMutation from '../hook/UseMutation';

type Props = {
    usuario: Usuario,
    deleteUser: (id: number) => void
}

const UserCard = ({usuario, deleteUser }: Props) => {
    return (
        <div className="user-card">
            <div className="user-info">
                <h3 className="user-name">{usuario.name}</h3>
                <p className="user-id">ID: {usuario.id}</p>
                <p className="user-email">Email: {usuario.email}</p>
                <p className="user-eggs">Eggs: {usuario.eggs}</p>
                <p className="user-goldenEggs">Golden Eggs: {usuario.goldenEggs}</p>
                <button className="delete-button" onClick={() => deleteUser(usuario.id)}>Delete</button>
            </div>
        </div>
    );
}

export default UserCard