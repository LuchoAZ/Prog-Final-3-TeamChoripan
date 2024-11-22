import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAlergenos } from '../../types/dtos/alergenos/IAlergenos';

const API_BASE_URL = 'http://190.221.207.224:8090/alergenos';

// AsyncThunk para obtener alérgenos desde la API
export const fetchAlergenos = createAsyncThunk('alergenos/fetchAlergenos', async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
});

// AsyncThunk para agregar un alérgeno
export const addAlergeno = createAsyncThunk('alergenos/create', async (alergeno: IAlergenos) => {
    const response = await axios.post(`${API_BASE_URL}`, alergeno);
    return response.data;
});

// AsyncThunk para actualizar un alérgeno
export const updateAlergeno = createAsyncThunk('alergenos/update', async (alergeno: IAlergenos) => {
    const response = await axios.put(`${API_BASE_URL}/${alergeno.id}`, alergeno);
    return response.data;
});

// AsyncThunk para eliminar un alérgeno
export const deleteAlergeno = createAsyncThunk('alergenos/delete', async (id: number) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
});

const alergenosSlice = createSlice({
    name: 'alergenos',
    initialState: {
        alergenos: [] as IAlergenos[],
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlergenos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAlergenos.fulfilled, (state, action) => {
                state.alergenos = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchAlergenos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar alérgenos';
            })
            .addCase(addAlergeno.fulfilled, (state, action) => {
                state.alergenos.push(action.payload);
            })
            .addCase(updateAlergeno.fulfilled, (state, action) => {
                const index = state.alergenos.findIndex((a) => a.id === action.payload.id);
                if (index !== -1) state.alergenos[index] = action.payload;
            })
            .addCase(deleteAlergeno.fulfilled, (state, action) => {
                state.alergenos = state.alergenos.filter((a) => a.id !== action.payload);
            });
    },
});

export default alergenosSlice.reducer;
