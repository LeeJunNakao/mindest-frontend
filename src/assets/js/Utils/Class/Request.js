import axios from 'axios'
import { store } from '../../index'
import { localStorageExists, getLocalStorage } from './utils'

class Request{
    constructor(){
        this.getToken();
    }

    getToken(){
        if(localStorageExists()){
            const { token } = getLocalStorage();
            this.token = token;
        }
    }

    async get(url,params,headers){
        try{
            return await axios({
                method: 'get',
                url,
                params,
                headers
            })
        }catch(err){
            err.response.data.errors.forEach(error=>{
                store.commit('pushErrorDescription',error);
                store.commit('notifyHasError');
            })
        }
    }

    async post(url,data,headers){
        try{
            axios({
                method: 'post',
                url,
                data,
                headers
            })
        }catch(err){
            err.response.data.errors.forEach(error=>{
                store.commit('pushErrorDescription',error);
                store.commit('notifyHasError');
            })
        }
    }
}

export default Request;