export const AddPasswords = () => {
    // tool tip Ventana emergente para agregar contraseña componente Reutilizable
    
    return (
        <div>
            <p>Agregar Contraseña</p>
            <div>
                <label htmlFor="username">Usuario</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" />
            </div>
            <div>
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" />
            </div>
            <div>
                <label htmlFor="url">URL</label>
                <input type="text" id="url" />
            </div>
            <div>
                <label htmlFor="category">Categoría</label>
                <select name="category" id="category">
                    <option value="">Seleccionar categoría</option>
                    <option value="work">Trabajo</option>
                    <option value="personal">Personal</option>
                    <option value="other">Otro</option>
                </select>
            </div>
        </div>
    )
}