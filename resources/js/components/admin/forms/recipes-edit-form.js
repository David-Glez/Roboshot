import React, {useState, useEffect} from 'react';

//  API
import UserService from '../../../services/auth/servicioUsuarios';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';

//  libreria toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import {Spinner, ToggleButtonGroup, ToggleButton}from 'react-bootstrap';

const RecipesUpdate = (props) => {

    console.log(props);
    const idRecipe = props.location.idRecipe;
    const robot = props.location.robot;

    const [loading, setLoading] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const home = async() => {
            const data = {
                id: idRecipe,
                robot: robot
            }
            const recipe = await UserService.recipe(data);
            console.log(recipe.data)
            setCargando(false)
        };
        home();
    }, []);

    return(
        <>
        <div className = 'card'>
            <Form encType="multipart/form-data" >
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Editar Receta
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <button className = 'btn btn-success float-right' disabled = {loading}>
                            {loading && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {cargando ? (
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
                                    id = 'nombre'
                                    name = 'nombre'
                                    //value = {nombre}
                                    disabled = {loading}
                                    //onChange = {onChangeNombre}
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
                                    id = 'nombre'
                                    name = 'nombre'
                                    //value = {nombre}
                                    disabled = {loading}
                                    //onChange = {onChangeNombre}
                                    //validations = {[required]}
                                />
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
                                    id = 'nombre'
                                    name = 'nombre'
                                    //value = {nombre}
                                    disabled = {loading}
                                    //onChange = {onChangeNombre}
                                    //validations = {[required]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>

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