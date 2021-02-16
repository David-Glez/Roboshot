import React from 'react';
//  if the input is required
const required = (value) => {
    if(!value){
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
            
        )
    }
}

//  check if the input contains a valid rfc
const validateRFC = (value) => {
    var fisica = "^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$"; 
    var moral = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
    
    const validPF = value.match(fisica);
    const validPM = value.match(moral);

    if(validPF || validPM){
        
    }else{
        return(
            <small className = 'text-danger' role = 'alert'>
                Formato inválido
            </small>
        )
    }
}

//  validate DB name
const validateDB = (value) => {
    var regex = /^[a-z0-9]$/
    const valid = regex.test(value);
    if(!valid){
        return(
            <small className = 'text-danger' role = 'alert'>
                Formato inválido
            </small>
        )
    }
}

//  check if the input contains a valid mac address
const validateMAC = (value) => {
    var regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const isMac = regex.test(value);
    if(!isMac){
        return(
            <small className = 'text-danger' role = 'alert'>
                Formato inválido
            </small>
        )
    }
}


export default {
    required,
    validateRFC,
    validateDB,
    validateMAC
}