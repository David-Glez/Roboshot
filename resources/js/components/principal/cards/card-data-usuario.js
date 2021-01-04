import React from 'react';

const CardDataUser = (props) => {
    const dataUsuario = props.dataUsuario;

    const abrirModal = (e) => {
        e.preventDefault();
        props.abrirModal();
    }

    return(
        <>
        <div className = 'cardLogin card-containerLogin'>
            <img src = {dataUsuario.img} alt="profil-img" className="profile-img-card" />
            <h5 className="card-title">{dataUsuario.nombres} {dataUsuario.apellidoP} {dataUsuario.apellidoM}</h5>
            <div className = 'row'>
                <div className = 'form-group row'>
                    <label htmlFor = 'emailUser' className="col-sm-4 col-form-label">Email</label>
                    <div className = 'col-sm-8'>
                        <span id = 'emailUser' className = 'primaryText form-control-plaintext'>
                            {dataUsuario.email}
                        </span>
                    </div>
                </div>
            </div>
            <div className = 'row'>
                <div className = 'form-group row'>
                    <label htmlFor = 'registro' className="col-sm-4 col-form-label">Creado</label>
                    <div className = 'col-sm-8'>
                        <span id = 'registro' className = 'primaryText form-control-plaintext'>
                            {dataUsuario.alta}
                        </span>
                    </div>
                </div>
            </div>
            <div className = 'row'>
                <div className = 'col-sm-12 d-flex justify-content-center'>
                    <button onClick = {(e) => abrirModal(e)} className = 'btn btn-success'>
                        Modificar Datos
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardDataUser;