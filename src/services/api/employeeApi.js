import apiService from "../axiosService/axios";

export const getAllEmployees = async () => {
    try {
      const response = await apiService.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch employees');
    }
  };  

export const uploadExcelFile = async (file) => {
    console.log("file s", file);
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiService.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to upload Excel file');
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await apiService.post('/', employeeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create employee');
  }
};

export const editEmployee = async (employeeId, employeeData) => {
  try {
    const response = await apiService.put(`/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit employee');
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    await apiService.delete(`/${employeeId}`);
    return true;
  } catch (error) {
    throw new Error('Failed to delete employee');
  }
};
