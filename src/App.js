import React from 'react';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// ROUTER
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// COMPONENTS
import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route exact path="/productos/editar/:id" component={EditarProducto} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
