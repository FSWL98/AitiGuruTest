import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from './slices/authSlice';
import { authApi } from '../api/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;