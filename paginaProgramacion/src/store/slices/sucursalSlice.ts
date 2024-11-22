import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';
import { sucursalService } from '../../services/sucursalService';

interface SucursalState {
    sucursales: ISucursal[];
    loading: boolean;
}

const initialState: SucursalState = {
    sucursales: [],
    loading: false,
};

export const fetchSucursales = createAsyncThunk('sucursal/fetchSucursales', async (companyId: number) => {
    return await sucursalService(companyId);
});


export const sucursalSlice = createSlice({
    name: 'sucursal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSucursales.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSucursales.fulfilled, (state, action) => {
                state.sucursales = action.payload;
                state.loading = false;
            })
            .addCase(fetchSucursales.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default sucursalSlice.reducer;
