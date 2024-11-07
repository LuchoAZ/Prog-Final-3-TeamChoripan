import axios from 'axios';
import { IEmpresa } from '../types/dtos/empresa/IEmpresa';
import { ICreateEmpresaDto } from '../types/dtos/empresa/ICreateEmpresaDto';

const axiosInstance = axios.create({
  baseURL: 'http://190.221.207.224:8090/empresas',
});

export const empresaService = {
  // Obtiene una empresa específica por su ID
  getEmpresaById: async (id: number): Promise<IEmpresa> => {
    const response = await axiosInstance.get<IEmpresa>(`/${id}`);
    return response.data;
  },

  // Obtiene todas las empresas
  getAllEmpresas: async (): Promise<IEmpresa[]> => {
    const response = await axiosInstance.get<IEmpresa[]>('');
    return response.data;
  },

  // Crea una nueva empresa con los datos proporcionados
  createEmpresa: async (newEmpresa: ICreateEmpresaDto): Promise<IEmpresa> => {
    const response = await axiosInstance.post<IEmpresa>('', newEmpresa);
    return response.data;
  },

  // Actualiza los datos de una empresa existente
  updateEmpresa: async (id: number, updatedEmpresa: IEmpresa): Promise<IEmpresa> => {
    const response = await axiosInstance.put<IEmpresa>(`/${id}`, updatedEmpresa);
    return response.data;
  },
};
