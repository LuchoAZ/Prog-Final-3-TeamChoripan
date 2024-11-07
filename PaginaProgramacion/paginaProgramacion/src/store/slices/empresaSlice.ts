import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IEmpresa } from '../../types/dtos/empresa/IEmpresa';
import { ICreateEmpresaDto } from '../../types/dtos/empresa/ICreateEmpresaDto';
import { empresaService } from '../../services/empresaService';

interface EmpresaState {
    empresas: IEmpresa[];
    loading: boolean;
}

const initialState: EmpresaState = {
    empresas: [],
    loading: false,
};

export const fetchEmpresas = createAsyncThunk('empresa/fetchEmpresas', async () => {
    return await empresaService.getAllEmpresas();
});

export const addEmpresa = createAsyncThunk('empresa/addEmpresa', async (empresa: ICreateEmpresaDto) => {
    return await empresaService.createEmpresa(empresa);
});

export const empresaSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmpresas.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmpresas.fulfilled, (state, action) => {
                state.empresas = action.payload;
                state.loading = false;
            })
            .addCase(fetchEmpresas.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addEmpresa.fulfilled, (state, action) => {
                state.empresas.push(action.payload);
            });
    },
});

export default empresaSlice.reducer;
