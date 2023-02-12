import config from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import errorHandler from "./errorHandler";

interface UrlInterface {
  baseUrl: string;
  headers: { headers:{ Authorization: string } };
}

const baseUrl = config.VITE_API_URL;

class ApiRequest implements UrlInterface {
  readonly baseUrl: string;
  readonly headers: { headers:{Authorization: string }};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    this.headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  async post(path: string, formData: { [key: string]: any }) {
    try {
      console.log(this.headers)
      const url = `${this.baseUrl}${path}`;
      return await axios.post(url, formData, this.headers);
    } catch (err: any) {
      throw err;
    }
  }

  async get(path: string) {
    try {
      const url = `${this.baseUrl}${path}`;
      return await axios.get(url, this.headers);
    } catch (err: any) {
      throw err;
    }
  }

  async patch(path: string, formData: { [key: string]: any }) {
    try {
      const url = `${this.baseUrl}${path}`;
      return await axios.patch(url, formData, this.headers);
    } catch (err: any) {
      throw err;
    }
  }

  async delete(path: string) {
    try {
      const url = `${this.baseUrl}${path}`;
      return await axios.delete(url, this.headers);
    } catch (err: any) {
      throw err;
    }
  }
}

export default new ApiRequest(baseUrl);
