import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';

const API_BASE_URL = 'http://190.221.207.224:8090/categorias';

// AsyncThunk para obtener categorías desde la API
export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
});

// AsyncThunk para agregar una categoría
export const addCategoria = createAsyncThunk('categorias/addCategoria', async (categoria: ICategorias) => {
    const response = await axios.post(`${API_BASE_URL}`, categoria);
    return response.data;
});

// AsyncThunk para actualizar una categoría
export const updateCategoria = createAsyncThunk('categorias/updateCategoria', async (categoria: ICategorias) => {
    const response = await axios.put(`${API_BASE_URL}/${categoria.id}`, categoria);
    return response.data;
});

// AsyncThunk para eliminar una subcategoría
export const deleteCategoria = createAsyncThunk('categorias/deleteCategoria', async (id: number) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
});

// AsyncThunk para agregar una subcategoría
export const addSubcategoria = createAsyncThunk(
    'categorias/addSubcategoria',
    async ({ categoriaId, subcategoria }: { categoriaId: number; subcategoria: ICategorias }) => {
        const response = await axios.post(`${API_BASE_URL}/${categoriaId}/subcategorias`, subcategoria);
        return { categoriaId, subcategoria: response.data };
    }
);

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: {
        categorias: [] as ICategorias[],
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategorias.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.categorias = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar categorías';
            })
            .addCase(addCategoria.fulfilled, (state, action) => {
                state.categorias.push(action.payload);
            })
            .addCase(updateCategoria.fulfilled, (state, action) => {
                const index = state.categorias.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) state.categorias[index] = action.payload;
            })
            .addCase(deleteCategoria.fulfilled, (state, action) => {
                state.categorias = state.categorias.filter((c) => c.id !== action.payload);
            })
            .addCase(addSubcategoria.fulfilled, (state, action) => {
                const { categoriaId, subcategoria } = action.payload;
                const categoria = state.categorias.find((c) => c.id === categoriaId);
                if (categoria) {
                    categoria.subCategorias = [...(categoria.subCategorias || []), subcategoria];
                }
            });
    },
});

export default categoriasSlice.reducer;
