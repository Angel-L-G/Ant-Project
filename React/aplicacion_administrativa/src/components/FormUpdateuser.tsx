import React, { useState } from 'react'
import UseMutation from '../hook/UseMutation'
import { GraphqlUpdateInputDTO } from '../type/typesGraphql';

type Props = {
    updateUser: any
}

const FormUpdateuser = ({updateUser}: Props) => {
    const {UpdateUserMutation} = UseMutation();
    const [formData, setFormData] = useState<GraphqlUpdateInputDTO>({
        active: false,
        id: 0,
        name: '',
        rol: '',
        email: '@gmail.com',
        password: '',
        img: '',
        eggs: 0,
        goldenEggs: 0
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        updateUser(formData);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Actualizar Usuario</h2>

            <div className="checkbox-container">
                <label htmlFor="active">Activo:</label>
                <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                />
            </div>

            <label htmlFor="id">ID:</label>
            <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
            />

            <label htmlFor="name">Nombre:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <label htmlFor="password">Contraseña:</label>
            <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

            <label htmlFor="img">Profile Picture:</label>
            <input
                type="text"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
            />

            <label htmlFor="eggs">Eggs:</label>
            <input
                type="number"
                id="eggs"
                name="eggs"
                value={formData.eggs}
                onChange={handleChange}
            />

            <label htmlFor="goldenEggs">Golden Eggs:</label>
            <input
                type="number"
                id="goldenEggs"
                name="goldenEggs"
                value={formData.goldenEggs}
                onChange={handleChange}
            />

            <button type="submit">Actualizar</button>
        </form>
    );
};

export default FormUpdateuser