import axios from "axios";
import { log } from './logg';

const baseUrl = 'http://localhost:8080';

async function httpGet(uri: string, param: any = {}, defaultTimeout: number = 5000) {
    try {
        const response = await axios.get(baseUrl + uri, {
            timeout: defaultTimeout,
            params: param
        });
        return response.data;
    } catch (error) {
        log('error', error);
        throw error;
    }
}

async function httpPost(uri: string, param: any, defaultTimeout: number = 5000) {
    try {
        const response = await axios.post(baseUrl + uri, param, {
            timeout: defaultTimeout,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        log('error', error);
        throw error;
    }
}


export { httpGet, httpPost }