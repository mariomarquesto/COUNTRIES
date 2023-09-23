import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer'; // Importa el reducer que define cómo se actualiza el estado
import thunkMiddleware from 'redux-thunk'; // Importa el middleware de Redux Thunk para manejar acciones asincrónicas

// ComposeEnhancer permite habilitar la extensión de Redux DevTools en el navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Crea la tienda Redux utilizando el rootReducer y aplicando el middleware Redux Thunk
const store = createStore(
  rootReducer, // El reducer que maneja el estado de la aplicación
  composeEnhancer(applyMiddleware(thunkMiddleware)) // Aplica Redux Thunk como middleware
);

export default store; // Exporta la tienda para su uso en la aplicación
