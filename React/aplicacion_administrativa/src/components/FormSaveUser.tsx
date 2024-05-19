import React from 'react'

type Props = {}

const FormSaveUser = (props: Props) => {
    return (
        <form className="form-container">
            <h2 className="form-title">Guardar Usuario</h2>

            <div className="checkbox-container">
                <label htmlFor="active">Activo:</label>
                <input type="checkbox" id="active" name="active" />
            </div>

            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" />

            <label htmlFor="rol">Rol:</label>
            <input type="text" id="rol" name="rol" />

            <label htmlFor="img">Profile Picture:</label>
            <input type="text" id="img" name="img" />
            
            <label htmlFor="eggs">Eggs:</label>
            <input type="number" id="eggs" name="eggs" />

            <label htmlFor="goldenEggs">Golden Eggs:</label>
            <input type="number" id="goldenEggs" name="goldenEggs" />
            
            <button type="submit">Enviar</button>
        </form>
    )
}

export default FormSaveUser