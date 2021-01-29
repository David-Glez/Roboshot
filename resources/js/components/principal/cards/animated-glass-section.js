import React, {useEffect} from 'react';

//  imagen
import vaso from '../../../assets/img/vaso.png'

const AnimatedGlass = (props) => {

    const cantidad = props.cantidad;
    const porcentaje = parseInt ((cantidad * 100)/300);

    //  variable a modificar
    const niveles = {
        '--liquid': '1%'
    }

    //  cambia el valor de la variable --liquid cuando cantidad cambie
    useEffect(() => {
        const nivel = porcentaje+'%';
        console.log(nivel)
        document.documentElement.style.setProperty('--liquid', nivel);
    }, [porcentaje]);

    return(
        <>
        <section className = 'animacion'>
            <img src = {vaso} className = 'image-fluid'/>
            <span className="porcentaje" >{porcentaje} %</span>
            <span className="mililitros">{cantidad} mL</span>
        </section>
        </>
    )

}

export default AnimatedGlass;