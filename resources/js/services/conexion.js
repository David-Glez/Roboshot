import http from './base';
 
class Accion{

    /****** trae todos los datos de los clientes al index ******/
    inicio(){
        return http.get('/inicio');
    }

    /*****  trae todas las recetas de un solo cliente *****/
    recetasCliente(cliente){
        return http.get('/receta/'+cliente);
    }

    /****** Trae los datos de una receta en especifico ******/
    traeReceta(id, cliente){
        return http.get('/receta/'+id+'/'+cliente);
    }

    /****** Trae la lista de ingredientes de un cliente ******/
    traeIngredientes(cliente){
        return http.get('/ingredientes/'+cliente);
    }

    /****** Crea un nuevo pedido ******/
    pedido(data){
        return http.post('/pedido/nuevo', data);
    }
}

export default new Accion();