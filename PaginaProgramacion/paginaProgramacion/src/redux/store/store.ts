import { configureStore } from '@reduxjs/toolkit';
import empresaReducer from '../slices/empresaSlice';
import sucursalReducer from '../slices/sucursalSlice';

export const store = configureStore({
    reducer: {
        empresa: empresaReducer,
        sucursal: sucursalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;