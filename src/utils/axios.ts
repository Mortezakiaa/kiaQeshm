import axios, { AxiosError, AxiosInstance } from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ADDRESS}/api`,
});

class Axios {
  private axios: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  async get<T = any>(url: string, params?: string) {
    try {
      const res = await this.axios.get<T>(url, { params });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) return e.response;
      return e;
    }
  }

  async post<T = any>(url: string, data: Partial<T> | any) {
    try {
      const res = await this.axios.post<T>(url, data);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) return e.response;
      return e as any;
    }
  }

  async patch<T = any>(url: string, data: Partial<T> | any) {
    try {
      const res = await this.axios.patch<T>(url, data);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) return e.response;
      return e;
    }
  }

  async delete<T = any>(url: string) {
    try {
      const res = await this.axios.delete<T>(url);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) return e.response;
      return e;
    }
  }
}

const ApiService = new Axios(axiosInstance);
export default ApiService;
