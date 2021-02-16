import React, {useState} from 'react';

//  navegation
import {Switch, Route} from 'react-router-dom';

//  componentes
import RoboshotsTable from '../../components/admin/tables/roboshots-table';
import RoboshotsAdd from '../../components/admin/forms/roboshots-register-form';
import RoboshotsDelete from '../../components/admin/modales/roboshots-delete-modal';
import RoboshotsUpdate from '../../components/admin/forms/roboshots-edit-form';

const RoboshotsAdmin = (props) => {

    const [eliminarRob, setEliminarRob] = useState(false);
    const [estacion, setEstacion] = useState({
        id: 0,
        nombre: '',
        cliente: ''
    })

    //  abre el modal
    const abrirModalEliminar = (id, nombre, cliente) => {
        setEstacion({
            id: id,
            nombre: nombre,
            cliente: cliente
        })
        setEliminarRob(true);
    }

    //  cerrar el modal
    const cerrarModalEliminar = () => {
        setEstacion({
            id: 0,
            nombre: '',
            cliente: ''
        })
        setEliminarRob(false);
        props.history.push('/admin');
    }
    
    return(
        <>
        <div className = 'content'>
            <div className = 'row'>
                <div className = 'col-md-12'>
                    <Switch>
                        <Route exact path = '/admin/roboshots'>
                            <RoboshotsTable
                                abrirModalDelete = {(e, i , r) => abrirModalEliminar(e, i ,r)} 
                            />
                        </Route>
                        <Route exact path = '/admin/roboshots/anadir' component = {RoboshotsAdd} />
                        
                        <Route exact path = '/admin/roboshots/editar'component = {RoboshotsUpdate} />
                            
                    </Switch>
                </div>
            </div>
        </div>

        <RoboshotsDelete 
            activo = {eliminarRob}
            inactivo = {(e) => cerrarModalEliminar(e)}
            data = {estacion}
        />
        </>
    )

}

export default RoboshotsAdmin;