import config from "../config";
import axios from 'axios'

interface UrlInterface {
    baseUrl: string;
    headers:{'Content-Type':string; 'Authentication': string};
}


const url = config.VITE_API_URL

class ApiRequest implements UrlInterface {
    readonly baseUrl:string;
    readonly headers:{'Content-Type':string; 'Authentication': string};

    constructor(baseUrl:string){
        this.baseUrl = baseUrl;

        this.headers = {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${localStorage.getItem("token")}`
        }

    }

    async post(path:string, formData:{[key:string]:any}){
        try{
            const url = `${this.baseUrl}${path}`;
            return await axios.post(url, formData)
        }
        catch(err){
            console.log(err)
        } 
    }

    async get(path:string){
        try{
            const url = `${this.baseUrl}${path}`;
            return await axios.get(url)
        }
        catch(err){
            console.log(err)
        } 
    }

    async patch(path:string, formData:{[key:string]:any}){
        try{
            const url = `${this.baseUrl}${path}`;
            return await axios.patch(url, formData)
        }
        catch(err){
            console.log(err)
        } 
    }

    async delete(path:string, formData:{[key:string]:any}){
        try{
            const url = `${this.baseUrl}${path}`;
            return await axios.delete(url)
        }
        catch(err){
            console.log(err)
        } 
    }

}

export default new ApiRequest(url)