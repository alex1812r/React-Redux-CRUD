import React, { useEffect, useRef } from 'react';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductoEditarAction, editarProductoAction } from '../redux/actions/productosActions';
import { 
  validarFormularioAction, 
  validacionExito,
  validacionError
} 
from '../redux/actions/validacionActions';

const EditarProducto = ({match, history}) => {
  const nombreRef = useRef('');
  const precioRef = useRef('');

  //DISPATCH
  const dispatch = useDispatch();
  const editarProducto = producto => dispatch( editarProductoAction(producto) );
  const validarFormulario = () => dispatch( validarFormularioAction() );
  const exitoValidacion = () => dispatch( validacionExito() );
  const errorValidacion = () => dispatch( validacionError() );

  //ID PARAMETRO
  const { id } = match.params;
  useEffect(() => {
    const obtenerProducto = id => dispatch(obtenerProductoEditarAction(id));
    obtenerProducto(id);
  },[dispatch, id]);

  // DATOS DE REDUX 
  const producto = useSelector(state => state.productos.producto);
  const error = useSelector(state => state.productos.error);

  const submitEditarProducto = e => {
    e.preventDefault();
    // INICIAR VALIDACION
    validarFormulario();
    // VALIDAR FORMULARIO
    if (nombreRef.current.value.trim() === '' || precioRef.current.value.trim() === '') {
      errorValidacion();
      return;
    }
    // EXITO AL VALIDAR
    exitoValidacion();
    // GUARDAR PRODUCTO EDITADO
    editarProducto({
      id,
      nombre: nombreRef.current.value,
      precio: precioRef.current.value,
    });
    history.push('/');
  };
  return (
    <>
      {
        error 
        ?
        <div className="alert alert-danger text-center mt-4">
          Hubo un Error, intenta denuevo
        </div>
        :
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Editar Producto</h2>
                <form onSubmit={submitEditarProducto}>
                  <div className="form-group">
                    <label>Titulo</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Titulo"
                      defaultValue={producto.nombre}
                      ref={nombreRef}
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio del Producto</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Precio"
                      defaultValue={producto.precio}
                      ref={precioRef}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
 
export default EditarProducto;