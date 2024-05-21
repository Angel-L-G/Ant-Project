import React from 'react'
import { Usuario } from '../type/types';

type Props = {
    usuario: Usuario
}

const UserCard = ({usuario}: Props) => {
    return (
        <div className="user-card">
            <img src={usuario.img} alt="User" className="user-avatar" />
            <div className="user-info">
                <h3 className="user-name">{usuario.name}</h3>
                <p className="user-email">{usuario.id}</p>
                <p className="user-email">{usuario.email}</p>
                
                <p className="user-email">{usuario.totalMoneyGenerated}</p>
                <p className="user-email">{usuario.eggs}</p>
                <p className="user-email">{usuario.goldenEggs}</p>
            </div>
        </div>
    );
}

export default UserCard