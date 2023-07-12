import axios from 'axios';

export const EMP_MANEGEMENT_BASE_URL = process.env.REACT_APP_BASE_URL || '';

const apiService = axios.create({
  baseURL: `${EMP_MANEGEMENT_BASE_URL}/api/employees`,
});

export default apiService;
