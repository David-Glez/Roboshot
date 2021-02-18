import React, {useState, useEffect} from 'react';
import UserService from '../../../services/auth/servicioUsuarios';

const useEditRoboshot = (id, validateForm, onSubmitData) => {
    const [roboshotData, setRoboshotData] = useState({
        loading: true,
        sending: false,
        id: 0,
        cliente: '',
        nombre: '',
        mac: '',
        estado: undefined,
    });
    useEffect(() => {
        const inicio = async() => {
            const response = await UserService.infoRoboshot(id);
            if(response){
                setRoboshotData({
                    loading: false,
                    sending: false,
                    id: response.data.idCliente,
                    cliente: response.data.cliente,
                    nombre: response.data.nombre,
                    mac: response.data.mac,
                    estado: response.data.estado
                })
            }
        }
        inicio()
    },[]);

    const onChangeInput = (e) => {
        const name = e.target.name;
        let value;
        switch(name){
            case 'estado':
                if(e.target.value == 'true'){
                    value = true;
                }
                if(e.target.value == 'false'){
                    value = false
                }
                break;
            case 'mac':
                value = e.target.value.toUpperCase();
                break;
            default:
                value = e.target.value;
                break;
        }
        setRoboshotData(roboshotData => ({...roboshotData, [name]:value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        let responseData;
        const validate = validateForm();
        if(validate){
            setRoboshotData(roboshotData => ({...roboshotData, ['sending']:true}))
            let data = {
                idRob: id,
                idCliente: roboshotData.id,
                mac: roboshotData.mac,
                nombre: roboshotData.nombre,
                estado: roboshotData.estado
            }
            const envio = UserService.editarRoboshot(data)
            envio.then((response) => {
                responseData = {
                    status: response.data.status,
                    mensaje: response.data.mensaje
                }
                setRoboshotData(roboshotData => ({...roboshotData, ['sending']:response.data.status}))
                onSubmitData(responseData)
            });
        }
    }

    return {roboshotData, onChangeInput, onSubmitForm}
}

export default useEditRoboshot