import React, {useState, useEffect} from 'react';

//  redireccion react
import {Link} from 'react-router-dom';

//  Estilos
import {Spinner} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//  componentes
import SinElementos from '../../alertas/vacio';

const TableContent = (props) => {

    const usuarios = props.data;
    const abrirModal = props.abrirModal;

    //  abrir modal de eliminar usuario
    const modalEliminar = (e, id, nombre, razon) => {
        e.preventDefault();
        props.abrirModal(id, nombre, razon)
    }

    return(
        <>
        {(usuarios == '') ? (
            <>
            <div className = 'row superior'>
                <SinElementos />
            </div>
            </>
        ):(
            <table className = 'table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Razón Social</th>
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
                            
                            <tr key = {index}>
                                <td>{item.id}</td>
                                <td>{item.usuario}</td>
                                <td>{item.razonSocial}</td>
                                <td>{item.rol}</td>
                                <td>{item.esquema}</td>
                                <td>{item.roboshots}</td>
                                <td>{item.fechaCreacion}</td>
                                <td>
                                    <Link 
                                        to = {{
                                            pathname: '/admin/usuarios/editar',
                                            idUsuario: item.id
                                        }}
                                        className = 'btn btn-outline-secondary'
                                    >
                                        <FontAwesomeIcon icon = {faEdit} />
                                    </Link>
                                    <a onClick = {(e) => modalEliminar(e, item.id, item.usuario, item.razonSocial)} className = 'btn btn-outline-danger'>
                                        <FontAwesomeIcon icon = {faTrashAlt} />
                                        
                                    </a>
                                </td>
                            </tr>
                            
                        )
                    })}
                </tbody>
            </table>
        )}
        
        </>
    )
};

const UsersTable = (props) => {
    
    const abrirEliminar = props.abrirModalDelete;

    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const inicio = async() => {
            const result = await UserService.verUsuarios();
            setUsuarios(result.data)
            if(result){
                setLoading(false);
            }
        };
        inicio();
    },[]);

    //  columnas para la tabla
    const columnas = [{
        dataField: 'id',
        text: 'ID'
    },{
        dataField: 'usuario',
        text: 'Nombre'
    },{
        dataField: 'razonSocial',
        text: 'Razón Social'
    },{
        dataField: 'rol',
        text: 'Rol'
    },{
        dataField: 'esquema',
        text: 'Base de Datos'
    },{
        dataField: 'roboshots',
        text: 'Roboshots'
    },{
        dataField: 'fechaCreacion',
        text: 'Fecha de Alta'
    }];

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Usuarios
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <Link to = '/admin/usuarios/anadir' className = 'btn btn-primary float-right'>
                            <FontAwesomeIcon icon={faPlus} />
                            <span className = 'customSpan'>Añadir Cliente</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {loading ? (
                    <>
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'secondary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    </>
                ):(
                    <>
                    <BootstrapTable keyField='id' data={ usuarios } columns={ columnas } />
                    
                    </>
                )}
            </div>
        </div>
        </>
    )
};

export default UsersTable;