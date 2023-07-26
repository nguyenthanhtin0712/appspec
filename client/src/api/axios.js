import axios from 'axios';
import { API_BASE_URL } from 'config';
import Cookies from 'js-cookie';

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

// Đăng ký interceptor để gắn token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
