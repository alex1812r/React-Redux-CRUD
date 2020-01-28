import React, { useState } from 'react';
// REDUX
import { crearNuevoProductoAction } from '../redux/actions/productosActions';
import { 
  validarFormularioAction, 
  validacionExito,
  validacionError
} 
from '../redux/actions/validacionActions';
import { useDispatch, useSelector } from 'react-redux';

const NuevoProducto = ({history}) => {
  // STATE
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  // DISPATCHES
  const dispatch = useDispatch();
  const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )
  const validarFormulario = () => dispatch( validarFormularioAction() );
  const exitoValidacion = () => dispatch( validacionExito() );
  const errorValidacion = () => dispatch( validacionError() );

  // OBTENER LOS DATOS DEL STATE
  const error = useSelector( state => state.error.error);

  // AGREGAR NUEVO PRODUCTO
  const submitNuevoProducto = e => {
    e.preventDefault();
       
    validarFormulario();

    // VALIDAR FORMULARIO
    if (nombre.trim() === '' || precio.trim() === '') {
      errorValidacion();
      return;
    }

    exitoValidacion();
    agregarProducto({ nombre, precio });
    history.push('/');
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Agregar
              </button>
            </form>
            {
              error && 
              <div className="alert alert-danger text-center mt-4">
                TODOS LOS CAMPOS SON OBLIGATORIOS
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default NuevoProducto;