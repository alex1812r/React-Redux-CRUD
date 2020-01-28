import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// REDUX
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../redux/actions/productosActions';

const Producto = ({id, nombre, precio}) => {
  
  const dispatch = useDispatch();
  const eliminarProducto = () => {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Un producto eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then(result => {
      if(result.value){
        dispatch(borrarProductoAction(id));
      }
    });  
  };

  return (
    <tr>
      <td>{ nombre } </td>
      <td>
        <span className="badge badge-pill badge-warning text-dark">
          $ { precio }
        </span>
      </td>
      <td className="acciones">
        <Link 
          to={`/productos/editar/${id}`}
          className="btn btn-primary mr-2">
            Editar
        </Link>

        <button onClick={eliminarProducto} className="btn btn-danger">
          Eliminar
        </button>
      </td>
    </tr>
  );
}
 
export default Producto;