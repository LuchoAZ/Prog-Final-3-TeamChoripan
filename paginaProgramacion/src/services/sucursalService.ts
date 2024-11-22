import axios from 'axios';
import { ISucursal } from '../types/dtos/sucursal/ISucursal';

const axiosInstance = axios.create({
    baseURL: 'http://190.221.207.224:8090/sucursales',
});

// Obtiene todas las sucursales de una empresa específica
export const sucursalService = async (companyId: number): Promise<ISucursal[]> => {
    try {
        const response = await axiosInstance.get<ISucursal[]>(`/porEmpresa/${companyId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching sucursales for company ID ${companyId}:`, error);
        throw new Error('No se pudieron obtener las sucursales');
    }
};
