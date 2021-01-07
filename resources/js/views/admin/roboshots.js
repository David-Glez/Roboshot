import React, {useState} from 'react';

//  navegation
import {Switch, Route} from 'react-router-dom';

//  toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import RoboshotsTable from '../../components/admin/tables/roboshots-table';
import RoboshotsAdd from '../../components/admin/forms/roboshots-register-form';

const RoboshotsAdmin = (props) => {

    const [eliminarRob, setEliminarRob] = useState(false);

    //  abre el modal
    const abrirModalEliminar = () => {
        setEliminarRob(!eliminarRob);
        console.log(eliminarRob)
    }

    //  cerrar el modal
    const cerrarModalEliminar = () => {
        setEliminarRob(false);
        console.log(eliminarRob)
    }

    return(
        <>
        <ToastContainer />
        <div className = 'content'>
            <div className = 'row'>
                <div className = 'col-md-12'>
                    <Switch>
                        <Route exact path = '/admin/roboshots'>
                            <RoboshotsTable
                                abrirModalDelete = {(e) => abrirModalEliminar(e)} 
                            />
                        </Route>
                        <Route exact path = '/admin/roboshots/anadir' component = {RoboshotsAdd} />
                    </Switch>
                </div>
            </div>
        </div>
        </>
    )

}

export default RoboshotsAdmin;