import React from 'react';

//  libreria para qr
import {QRCode} from 'react-qr-svg';

const QRGenerator = (props) => {

    const codigo = props.codigo;
    return(
        <>
        <QRCode
            bgColor = "#FFFFFF"
            fgColor = "#000000"
            level = "L"
            style = {{ width: 200 }}
            value = {codigo}
        />
        </>
    )
};

export default QRGenerator;