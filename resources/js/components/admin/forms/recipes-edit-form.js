import React, {useState, useEffect} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';

//  libreria toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import {Spinner, ButtonGroup, ToggleButton}from 'react-bootstrap';
import RecipeIngredients from '../tables/recipe-ingredients-table';

//  custom hook
import useRecipeEdit from '../../../hooks/admin/recipes/recipes-edit-hook';

const RecipesUpdate = (props) => {
    const idRecipe = props.location.idRecipe;
    const robot = props.location.robot;
    const data = {
        id: idRecipe,
        robot: robot
    }
    const [state, setState] = useState('')
    const [mix, setMix] = useState('');
    const cerrarToast = () => {
        props.history.push('/admin/recetas');
    }
    //  sends data to API
    const onSubmitData = (response) => {
        
        if(response.status == true){
            toast.success(response.mensaje,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined,
                onClose: () => cerrarToast()
            });
        }else{
            let mensajes = response.mensaje;
            mensajes.forEach((item) => {
                toast.warning(item,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined
                });
            });
        }
    }
    const {dataForm, onChangeInput, onSubmitForm} = useRecipeEdit(data, onSubmitData);

    useEffect(() => {
        if(dataForm.state === true){
            setState({
                activo: true,
                inactivo: false
            })
        }
        if(dataForm.state === false){
            setState({
                activo: false,
                inactivo: true
            });
        }
        if(dataForm.mix == true){
            setMix({
                activo: true,
                inactivo: false
            })
        }
        if(dataForm.mix == false){
            setMix({
                activo: false,
                inactivo: true
            })
        }
    }, [dataForm.state, dataForm.mix])

    return(
        <>
        <div className = 'card'>
            <Form onSubmit = {onSubmitForm} encType="multipart/form-data" >
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Editar Receta
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <button className = 'btn btn-success float-right' disabled = {dataForm.sending}>
                            {dataForm.sending && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {dataForm.loading ? (
                    <>
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'secondary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    </>
                ):(
                    <>
                    <div className = 'row'>
                    <div className = 'col-md-6'>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Nombre
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'name'
                                    name = 'name'
                                    value = {dataForm.name}
                                    disabled = {true}
                                    //onChange = {onChangeInput}
                                    //validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Estacion
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'roboshot'
                                    name = 'roboshot'
                                    value = {dataForm.roboshot}
                                    disabled = {true}
                                    //onChange = {onChangeInput}
                                    //validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Precio
                            </label>
                            <div className = 'col-sm-8'>
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-default">$</span>
                                    </div>
                                    <input
                                        type = 'text'
                                        className = 'form-control'
                                        id = 'price'
                                        name = 'price'
                                        value = {dataForm.price}
                                        disabled = {true}
                                        //onChange = {onChangeInput}
                                        //validations = {[required]}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Descripcion
                            </label>
                            <div className = 'col-sm-8'>
                                <Textarea
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'description'
                                    name = 'description'
                                    value = {dataForm.description}
                                    disabled = {dataForm.sending}
                                    onChange = {onChangeInput}
                                    //validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Mezclar Ingredientes
                            </label>
                            <div className = 'col-sm-8'>
                                <ButtonGroup toggle>
                                    <ToggleButton
                                        type="radio"
                                        variant="outline-success"
                                        name="mix"
                                        value={true}
                                        checked={mix.activo}
                                        onChange={onChangeInput}
                                        disabled = {dataForm.loading}
                                    >
                                        Si
                                    </ToggleButton>
                                    <ToggleButton
                                        type="radio"
                                        variant="outline-danger"
                                        name="mix"
                                        value={false}
                                        checked={mix.inactivo}
                                        onChange={onChangeInput}
                                        disabled = {dataForm.loading}
                                    >
                                        No
                                    </ToggleButton>
                                </ButtonGroup>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Estado de la receta
                            </label>
                            <div className = 'col-sm-8'>
                                <ButtonGroup toggle>
                                    <ToggleButton
                                        type="radio"
                                        variant="outline-success"
                                        name="state"
                                        value={true}
                                        checked={state.activo}
                                        onChange={onChangeInput}
                                        disabled = {dataForm.loading}
                                    >
                                        Activo
                                    </ToggleButton>
                                    <ToggleButton
                                        type="radio"
                                        variant="outline-danger"
                                        name="state"
                                        value={false}
                                        checked={state.inactivo}
                                        onChange={onChangeInput}
                                        disabled = {dataForm.loading}
                                    >
                                        Inactivo
                                    </ToggleButton>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-sm-12 imgPadre'>
                                <div className = 'imageContent content-justify-center'>
                                <img src={dataForm.newImg ? URL.createObjectURL(dataForm.newImg) : dataForm.img }  />
                                </div>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'img' className = 'col-sm-2'>
                                Logo
                            </label>
                            <div className = 'col-sm-8'>
                                <div className = 'custom-file'>
                                    <input type = 'file' id = 'img' name = 'newImg' className = 'custom-file-input' onChange = {onChangeInput} lang="es" />
                                    <label className="custom-file-label" htmlFor="img">Seleccionar...</label>
                                </div>
                            </div>
                        </div>
                        <div className = 'row'>
                            <RecipeIngredients
                                ingredients = {dataForm.ingredients} 
                            />
                        </div>
                    </div>
                    </div>
                    </>
                )}
                
            </div>
            <CheckButton style={{ display: "none" }}  />
            </Form>
        </div>
        </>
    )

}

export default RecipesUpdate;