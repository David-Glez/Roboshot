import React, {useState, useEffect} from 'react';

//funciones de redireccionamiento
import {Link}from 'react-router-dom';

//funciones consultas a bd y localStorage
import UserService from '../../../services/auth/servicioUsuarios';
import AuthService from '../../../services/auth/autenticacion';

//iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//Estilos de tabla
import {Table, Spinner}from 'react-bootstrap';

const ListaUsuarios = () =>{

    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    //extraccion de lista de usuarios
    useEffect(() =>{
        const inicio = async() =>{
            const resultado = await UserService.verUsuarios();
            setUsuarios(resultado.data)
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
                    Lista de usuarios
                </h3>
                <div className = 'card-tools'>
                    <Link to = '/admin/clientes/anadir' className = 'btn btn-primary'>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className = 'customSpan'>Añadir Cliente</span>
                    </Link>
                </div>
            </div>
            <div className = 'card-body'>
                {loading ? (
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'primary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    
                ):(
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Base de datos</th>
                                <th>Roboshots</th>
                                <th>Fecha de creación</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody className = 'text-center'>
                            {usuarios.map((item, index) => {
                                return(
                                    <tr key ={index}>
                                        <td>{item.id}</td>
                                        <td>{item.usuario}</td>
                                        <td>{item.rol}</td>
                                        <td>{item.esquema}</td>
                                        <td>{item.roboshots}</td>
                                        <td>{item.fechaCreacion}</td>
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
        </div>
        </>
    )
};

export default ListaUsuarios;