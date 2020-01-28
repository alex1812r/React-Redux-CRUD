import React, { useEffect } from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../redux/actions/productosActions';

import Producto from '../components/Producto';

const Productos = () => {

  // DISPATCHES
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarProductos = () => dispatch( obtenerProductosAction() );
    cargarProductos();
  },[dispatch]);

  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);
  const productos = useSelector(state => state.productos.productos);

  return (
    <>
    {
      error &&
        <div className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un Error
        </div>
    }
    <h2 className="text-center my-5">Listado de Productos</h2>
    <table className="table table-striped">
      <thead className="bg-primary table-dark">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Acciones</th>
        </tr>   
      </thead>
      <tbody>
        {
          productos.map(producto => (
            <Producto
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
            />
          ))
        }
      </tbody>
    </table>
    {
      loading && 'CARGANDO...'
    }    
    </>
  );
}
 
export default Productos;