import reduxPersist from '../store/reduxPersist';
import { persistStore } from 'redux-persist'

const updateReducers = (store) => {
  const config = reduxPersist.storeConfig;
  return persistStore(store, config);
};

export  default { updateReducers };