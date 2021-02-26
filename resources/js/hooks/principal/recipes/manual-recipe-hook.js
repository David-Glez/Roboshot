import React, {useState, useEffect} from 'react'
import {useHomeDispatch, ingredientsClient, useHomeState, addOrderToCart} from '../../../context';

const useManualRecipe = () => {
    const dispatch = useHomeDispatch();
    const settings = useHomeState();
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({
        idIngrediente: 0,
        nombre: '',
        idCategoria: 0,
        categoria: '',
        cantidad: 0,
        precio: 0
    });
    const [categories, setCategories] = useState([]);
    const [ingCat, setIngCat] = useState([]);

    const [lista, setLista] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [pedido, setPedido] = useState({
        idReceta: 0,
        idCliente: settings.modal.data,
        nombre: 'Personal',
        cliente: '',
        descripcion: 'Receta Personalizada',
        precio: 0,
        img: '/images/camera.jpg',
        cantidad: 0,
        ingredientes: []
    });
    //  load all ingredients and categories from client db
    useEffect(() => {
        const index = async() => {
            try{
                const resp = await ingredientsClient(dispatch, settings.modal.data);
                if(resp.status == 200){
                    setIngredients(resp.data.ingredientes);
                    setCategories(resp.data.categorias);
                    dispatch({type: 'INGREDIENTS_CHARGED'})
                }
                
            }catch(error){
                dispatch({type: 'ERROR_LOAD'})
                console.log(error)
            }
        }
        index()
    }, []);

    useEffect(() => {
        if(ingredient.idIngrediente != 0){
            const fil = lista.filter(ing => ing.idIngrediente == ingredient.idIngrediente);
            if(fil == ''){
                setLista(lista => [...lista, ingredient])
                setPrecio(precio + ingredient.precio)
                setCantidad(cantidad + ingredient.cantidad)
            }else{
                if(ingredient.cantidad <= 0){
                    setPrecio(precio - ingredient.precioInd)
                    setCantidad(cantidad - 10)
                    setLista(lista.filter(item => item.idIngrediente != ingredient.idIngrediente));
                }else{
                    const ing = lista;
                    let total = 0;
                    let mil = 0;
                    ing.forEach(i => {
                        if(i.idIngrediente == ingredient.idIngrediente){
                            i.cantidad = ingredient.cantidad
                            i.precio = ingredient.precio
                        }
                        total = total + i.precio;
                        setPrecio(total);
                        mil = mil + i.cantidad;
                        setCantidad(mil)
                    })
                    setLista(ing)
                }
            }
        }
    }, [ingredient]);

    useEffect(() => {

        setPedido({
            idReceta: 0,
            idCliente: settings.modal.data,
            nombre: 'Personal',
            cliente: '',
            descripcion: 'Receta Personalizada',
            precio: precio,
            img: '/images/camera.jpg',
            cantidad: cantidad,
            ingredientes: lista
        })

    }, [lista, precio]);

    
    const ingredientsxcategory = (id) => {
        const filter = ingredients.filter(ing => ing.categoria == id)
        setIngCat(filter)
    }

    const ingredientSelected = (id, ml) => {
        const ing = ingredients.find(i => i.idIngrediente == id)
        const cat = categories.find(c => c.idCategoria == ing.categoria)
        let precioIng = 0;
        if(ml > 0){
            precioIng = (ing.precio * ml)/10;
        }else{
            precioIng = ing.precio;
        }
        
        setIngredient({
            idIngrediente:id,
            nombre: ing.marca,
            idCategoria: ing.categoria,
            categoria: cat.nombre,
            cantidad: ml,
            precio: precioIng, 
            precioInd: ing.precio
        })
    }

    const sendToCart = (e) => {
        e.preventDefault();
        if(pedido.ingredientes == '' || pedido.cantidad > 300){
            console.log('no hay ingredientes')
        }else{
            addOrderToCart(dispatch, pedido, settings.counter)
        }
    }

    return {
        categories,
        ingCat,
        pedido,
        ingredientsxcategory,
        ingredientSelected,
        sendToCart
    }
}

export default useManualRecipe