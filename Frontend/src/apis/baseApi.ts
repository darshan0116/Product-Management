import axios from 'axios';

const endPoint = process.env.REACT_APP_BACKEND_URL;


const apiConfig = (flag = false) => {
    if (localStorage.getItem('loginToken')) {
        return {
            headers: {
                Authorization: `bearer ${localStorage.getItem('loginToken')}`,
                'Content-Type': flag
                    ? 'multipart/form-data'
                    : 'application/json',
            },
            method: 'PUT,DELETE,POST,GET,OPTION',
        };
    }
    return { withCredentials: false };
};

export const getApi = (url?: string, params?: any) => {

    return axios.get(`${endPoint}${url}`, {
        params: params,
        ...apiConfig(),
    });
};

export const postApi = (url: string, apiData?: any, flag?: boolean) => {
    
    return axios.post(`${endPoint}${url}`, apiData , apiConfig(flag));
};

export const putApi = (url: string, apiData: any, flag?: boolean) => {

    return axios.put(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const deleteApi = (url: string) => {

    return axios.delete(`${endPoint}${url}`, apiConfig());
};

export const deleteApiWithData = (url: string, apiData?: any) => {
    
    return axios.delete(`${endPoint}${url}`, {
        data: apiData,
        ...apiConfig(),
    });
};

