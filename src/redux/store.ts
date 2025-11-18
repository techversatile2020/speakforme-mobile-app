import { configureStore } from '@reduxjs/toolkit';
import { createMMKV } from 'react-native-mmkv';
import { persistReducer, persistStore, Storage } from 'redux-persist';
import { rootReducer } from './reducers';

export const storage = createMMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.remove(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['onboarding', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
