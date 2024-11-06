import { configureStore } from '@reduxjs/toolkit';
import empresaSlice from './slices/empresaSlice';
import sucursalSlice from './slices/sucursalSlice';

export const store = configureStore({
    reducer: {
        empresa: empresaSlice,
        sucursal: sucursalSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
