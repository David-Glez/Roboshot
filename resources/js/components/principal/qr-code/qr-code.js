import React from 'react';

//  libreria para qr
import {QRCode} from 'react-qr-svg';
import {useHomeState} from '../../../context';

const QRGenerator = (props) => {

    const settings = useHomeState();
    return(
        <>
        <QRCode
            bgColor = "#FFFFFF"
            fgColor = "#000000"
            level = "L"
            style = {{ width: 200 }}
            value = {settings.qr_code}
        />
        </>
    )
};

export default QRGenerator;