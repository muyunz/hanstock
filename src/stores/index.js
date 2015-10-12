import { compose, createStore, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';

let createStoreWithMiddleware;

if (__DEBUG__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    devTools()
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);
}

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
