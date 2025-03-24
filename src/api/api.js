import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Получить список филиалов
export const getBranches = async (name = '') => {
  const response = await api.get('/branches/management/branches', { params: { name } });
  return response.data;
};

// Создать филиал
export const createBranch = async (data) => {
  const response = await api.post('/branches/management/branches', data);
  return response.data;
};

// Обновить филиал
export const updateBranch = async (id, data) => {
  const response = await api.put(`/branches/management/branches/${id}`, data);
  return response.data;
};

// Удалить филиал
export const deleteBranches = async (branchIds) => {
  const response = await api.delete('/branches/management/branches', {
    params: { branch_id: branchIds },
  });
  return response.data;
};
