import React, {useState, useEffect} from 'react';
import UserService from '../../../services/auth/servicioUsuarios';

const useAddRoboshot = (validateForm, onSubmitData) => {

    const [roboshotData, setRoboshotData] = useState({
        loading: false,
        nombre: '',
        mac: '',
        cliente: 0,
        clientes: []
    });

    useEffect(() => {
        const inicio = async() => {
            const resp = await UserService.clientes();
            if(resp){
                setRoboshotData(roboshotData => ({...roboshotData, ['clientes']:resp.data}))
            }
        }
        inicio()
    },[]);

    const onChangeInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setRoboshotData(roboshotData => ({...roboshotData, [name]:value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        let responseData;
        const validate = validateForm();
        if(validate){
            setRoboshotData(roboshotData => ({...roboshotData, ['loading']:true}))
            let data = {
                idCliente: roboshotData.cliente,
                mac: roboshotData.mac,
                nombre: roboshotData.nombre
            }
            const envio = UserService.anadirRoboshot(data);
            envio.then((response) => {
                if(response.data.status == true){
                    responseData = {
                        status: response.data.status,
                        mensaje: response.data.mensaje
                    }
                }else{
                    responseData = {
                        status: response.data.status,
                        mensaje: response.data.mensaje
                    }
                    setRoboshotData(roboshotData => ({...roboshotData, ['loading']:false}))
                }
                onSubmitData(responseData)
            });
        }
    }

    return {roboshotData, onChangeInput, onSubmitForm}
}

export default useAddRoboshot;