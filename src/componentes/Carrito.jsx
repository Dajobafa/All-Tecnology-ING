const Carrito = (props) => {
    return (
        <div Style=' background-color:white; padding:20px; border:solid 3px black'>
            <table className="tabla">           
                <thead Style=' background-color:black'>
                    <tr Style='color:white' >
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Caracteristicas</th>
                        <th>Tipo</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                            <button className="btn btn-primary" > + </button>
                            {"   "}
                            <button className="btn btn-danger" > - </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Carrito
