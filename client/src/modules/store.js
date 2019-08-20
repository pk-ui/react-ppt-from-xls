import { applyMiddleware, compose, createStore } from 'redux';

function configureStore({ state, middlewares = [], enhancers = [] } = {}) {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = compose(middlewareEnhancer, ...enhancers);

  const store = createStore(state, composedEnhancers);

  return store;
}

export default configureStore;
