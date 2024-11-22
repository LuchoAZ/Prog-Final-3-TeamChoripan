import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProductos } from '../../types/dtos/productos/IProductos';


const API_BASE_URL = 'http://190.221.207.224:8090/articulos';

// AsyncThunk para obtener productos desde la API
export const fetchProductos = createAsyncThunk('articulos/fetchArticulos', async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
});

// AsyncThunk para agregar un producto
export const addProducto = createAsyncThunk('articulos/create', async (producto: IProductos) => {
    const response = await axios.post(`${API_BASE_URL}`, producto);
    return response.data;
});

// AsyncThunk para actualizar un producto
export const updateProducto = createAsyncThunk('articulos/update', async (producto: IProductos) => {
    const response = await axios.put(`${API_BASE_URL}/${producto.id}`, producto);
    return response.data;
});

// AsyncThunk para eliminar un producto
export const deleteProducto = createAsyncThunk('articulos/delete', async (id: number) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
});

const productosSlice = createSlice({
    name: 'productos',
    initialState: {
        productos: [] as IProductos[],
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductos.fulfilled, (state, action) => {
                state.productos = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProductos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar productos';
            })
            .addCase(addProducto.fulfilled, (state, action) => {
                state.productos.push(action.payload);
            })
            .addCase(updateProducto.fulfilled, (state, action) => {
                const index = state.productos.findIndex((prod) => prod.id === action.payload.id);
                if (index !== -1) state.productos[index] = action.payload;
            })
            .addCase(deleteProducto.fulfilled, (state, action) => {
                state.productos = state.productos.filter((prod) => prod.id !== action.payload);
            });
    },
});

export default productosSlice.reducer;
