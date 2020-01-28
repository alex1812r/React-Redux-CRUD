import { 
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITOSA,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDICCION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';


// ------ FUNCTION PRINCIPAL ------

export function crearNuevoProductoAction(producto) {
  return (dispatch) => {
    dispatch( nuevoProducto() );

    // INSERTAR EN LA API
    clienteAxios.post('/productos', producto)
      .then( respuesta => {
        console.log('respuesta :', respuesta);
        dispatch( agregarProductosExito(producto) );
      })
      .catch(error => {
        console.log('error :', error);
        dispatch( agregarProductosError(error) )
      });

  };
}

export const nuevoProducto = () => ({
  type: AGREGAR_PRODUCTO
});

export const agregarProductosExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

export const agregarProductosError =  () => ({
  type: AGREGAR_PRODUCTO_ERROR,
})


// ------ OBTENER LISTADO DE PRODUCTOS (CONSULTAR API) ------

export function obtenerProductosAction() {
  return dispatch => {
    dispatch( obtenerProductosComienzo() );
    clienteAxios.get('/productos')
      .then(respuesta => {
        dispatch( obtenerProductosExito(respuesta.data) );
      })
      .catch(error => {
        console.log('error :', error);
        dispatch ( obtenerProductosError() );
      });
  };
};

export const obtenerProductosComienzo = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
});

export const obtenerProductosExito = productos => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: productos,
})

export const obtenerProductosError = error => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: error,
})


// ------ ELIMINAR PRODUCTO ------

export function borrarProductoAction(id) {
  return dispatch => {
    dispatch( obtenerProductoEliminar() )
    clienteAxios.delete(`/productos/${id}`)
      .then(respuesta => {
        console.log('respuesta :', respuesta);
        dispatch( eliminarProductoExito(id) );
      })
      .catch(error => {
        dispatch( eliminarProductoError() );
      })
  };
}

export const obtenerProductoEliminar = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = id => ({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id
});

export const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR
});


// ----- OBTENER PARA EDITAR PRODUCTO ------ 

export function obtenerProductoEditarAction(id) {
  return dispatch => {
    dispatch( obtenerProductoAction() );
    
    clienteAxios.get(`/productos/${id}`)
      .then(respuesta => {
        dispatch( obtenerProductoEditarExito(respuesta.data) )
      })
      .catch(error => {
        console.log('error :', error);
        dispatch( obtenerProductoEditarError() );
      });
  };
};

export const obtenerProductoAction = () => ({
  type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto
})

export const obtenerProductoEditarError = () => ({
  type: PRODUCTO_EDITAR_ERROR
})


// ------ EDITAR PRODUCTO ------

export function editarProductoAction(producto) {
  return dispatch => {
    dispatch( comenzarEdicionProducto() );
    clienteAxios.put(`/productos/${producto.id}/`, producto)
      .then(respuesta => {
        dispatch(editarProductoExito(respuesta.data));
        Swal.fire(
          'Almacenado',
          'El Producto se almaceno Correctamente',
          'success'
        );
      })
      .catch(error => {
        console.log('error', error);
        dispatch(editarProductoError());
      });
  }
}

export const comenzarEdicionProducto = () => ({
  type: COMENZAR_EDICCION_PRODUCTO  
});

export const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

export const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR
})