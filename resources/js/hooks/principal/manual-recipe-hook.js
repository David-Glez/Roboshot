import React, {useState, useEffect} from 'react';

const usePedido = (ingrediente, id) => {

    const [lista, setLista] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [pedido, setPedido] = useState({
        idReceta: 0,
        idCliente: id,
        nombre: 'Personal',
        cliente: '',
        descripcion: 'Receta Personalizada',
        precio: 0,
        img: '/images/camera.jpg',
        cantidad: 0,
        ingredientes: []
    });


    useEffect(() => {
        if(ingrediente.idIngrediente != 0){
            const fil = lista.filter(ing => ing.idIngrediente == ingrediente.idIngrediente);
            if(fil == ''){
                setLista(lista => [...lista, ingrediente])
                setPrecio(precio + ingrediente.precio)
                setCantidad(cantidad + ingrediente.cantidad)
            }else{
                if(ingrediente.cantidad <= 0){
                    setPrecio(precio - ingrediente.precioInd)
                    setCantidad(cantidad - 10)
                    setLista(lista.filter(item => item.idIngrediente != ingrediente.idIngrediente));
                }else{
                    const ing = lista;
                    let total = 0;
                    let mil = 0;
                    ing.forEach(i => {
                        if(i.idIngrediente == ingrediente.idIngrediente){
                            i.cantidad = ingrediente.cantidad
                            i.precio = ingrediente.precio
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
    }, [ingrediente]);

    useEffect(() => {

        setPedido({
            idReceta: 0,
            idCliente: id,
            nombre: 'Personal',
            cliente: '',
            descripcion: 'Receta Personalizada',
            precio: precio,
            img: '/images/camera.jpg',
            cantidad: cantidad,
            ingredientes: lista
        })

    }, [lista, precio]);
    
    return pedido

}

export default usePedido;