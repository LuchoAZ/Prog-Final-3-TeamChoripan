import { configureStore } from '@reduxjs/toolkit';
import empresaSlice from './slices/empresaSlice';
import sucursalSlice from './slices/sucursalSlice';
import productosSlice from './slices/productosSlice';
import categoriasSlice from './slices/categoriasSlice';
import alargenosSlice from './slices/alargenosSlice';

export const store = configureStore({
    reducer: {
        empresa: empresaSlice,
        sucursal: sucursalSlice,
        productos: productosSlice,
        alargenos: alargenosSlice,
        categorias: categoriasSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
