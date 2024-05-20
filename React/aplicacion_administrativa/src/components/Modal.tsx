import React, { useEffect, useState } from 'react'
import { Usuario } from '../type/types';
import UseInformation from '../hook/UseInformation';

type Props = {
    user: Usuario,
    isOpen: any,
    onClose: any
}

const UserModal = ({ user, isOpen, onClose }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="notification">
            <div className="notification-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Detalles del Usuario</h2>

                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
                
                <p><strong>Activo:</strong> {user.active ? 'Sí' : 'No'}</p>
                <p><strong>Baneado:</strong> {user.banned ? 'Sí' : 'No'}</p>

                <p><strong>Huevos:</strong> {user.eggs}</p>
                <p><strong>Huevos Dorados:</strong> {user.goldenEggs}</p>
                
                <img src={user.img} alt={`${user.name}'s profile`} className="profile-img" />
            </div>
        </div>
    );
};

export default UserModal;