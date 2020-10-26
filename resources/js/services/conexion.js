import http from './base';
 
class Accion{

    /****** trae todos los datos de las recetas al index ******/
    inicio(){
        return http.get('/inicio');
    }

    /****** Trae los datos de una receta en especifico ******/
    traeReceta(id){
        return http.get('/receta/'+id);
    }

    /****** Trae la lista de ingredientes registrados ******/
    traeIngredientes(){
        return http.get('/ingredientes');
    }

    /****** Crea un nuevo pedido ******/
    pedido(data){
        return http.post('/pedido/nuevo', data);
    }
}

export default new Accion();