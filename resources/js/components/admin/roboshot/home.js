import React, {useState, useEffect} from 'react';

//funciones consultas a bd y localStorage
import UserService from '../../../services/auth/servicioUsuarios';
import AuthService from '../../../services/auth/autenticacion';

//iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//Estilos de tabla
import {Table, Spinner}from 'react-bootstrap';

const Roboshot = () =>{

    const [loading, setLoading] = useState(true);
    const [roboshots, setRoboshots] = useState([]);
    const [vacio, setVacio] = useState(false);
    const [mensaje, setMensaje] = useState("");

    //extraccion de lista de usuarios
    useEffect(() =>{
        const inicio = async() =>{
            const resultado = await UserService.verRoboshots();
            if(resultado.data == ''){
                setVacio(true);
                setMensaje('No hay datos registrados');
            }else{
                setRoboshots(resultado.data)
            }
            
            if(resultado){
                setLoading(false);
            }
        }
        inicio();
    }, []);

    return(
        <>
        <div className = 'card card-primary card-outline'>
            <div className = 'card-header'>
                <h3 className = 'card-title'>
                    Lista de Roboshots
                </h3>
            </div>
            <div className = 'card-body'>
                {loading ? (
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'primary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    
                ):(
                    <div>
                        {vacio ? (
                            <div className = 'text-center'>
                                {mensaje}
                            </div>
                        ):(
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        
                                        <th>MAC</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody className = 'text-center'>
                            {roboshots.map((item, index) => {
                                return(
                                    <tr key ={index}>
                                        <td>{item.idRoboshot}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.MAC}</td>
                                        
                                        <td>
                                            <a className = 'btn btn-outline-secondary'>
                                                <FontAwesomeIcon icon = {faEdit} />
                                                <span className = 'customSpan'>Editar</span>
                                            </a>
                                            <a className = 'btn btn-outline-danger'>
                                                <FontAwesomeIcon icon = {faTrashAlt} />
                                                <span className = 'customSpan'>Eliminar</span>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                            </Table>
                        )}
                        
                    </div>
                    
                )}
            </div>
        </div>
        </>
    )
};

export default Roboshot;