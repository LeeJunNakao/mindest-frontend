const URL = require('../../../config/URL')
const axios = require('axios')
const storageName = 'mindest'
import { store } from '../index'
import { requestGET } from './game'

async function verifyIfIsAuthenticated(callback,changeState){
    changeState(true)
    const authenticated = localStorageExists() ? await verifyIfTokenIsValid() : false
    callback(authenticated)
    changeState(false)
}

function localStorageExists(){
    const token = localStorage.getItem(storageName) || false
    return token ? true : false
}

async function verifyIfTokenIsValid(changeState){
    return await validateToken() 
}

async function validateToken(){
    try{
        const response = await request('post',URL.validateToken)
        if(response.data.valid===true){
            return true
        }else{
            removeLocalStorage()
            return false
        }
    }catch(err){
        console.log('Erro ao validar o token',err)
        removeLocalStorage()
        return false
    }
}

function removeLocalStorage(){
    localStorage.removeItem(storageName)
    return false
}

async function request(method,url,data=null){
    let token =false
    const storage = localStorage.getItem(storageName) 
    if(storage) token = JSON.parse(storage).token
    try{
        return await axios({
            method,
            url,
            headers: {
                'Content-Type':'application/json',
                'Accept':'*/*',
                token
            },
            data: data
        })
    }catch(err){
        console.log('Em request()',err.response.data.errors)
        err.response.data.errors.forEach(error=>{
            store.commit('pushErrorDescription',error);
            store.commit('notifyHasError');
        })
        
    }
}

async function authenticate(type,data,callback,changeState){
    try{    
        const url = { login: URL.login, register: URL.register }
        const response = await request('post',url[type],data)
        
        if(response && response.data) callback(response.data)
        changeState(false)
    }catch(err){
        changeState(false)
    }
}

function setLocalStorage(data){
    localStorage.setItem(storageName,JSON.stringify(data))
}

function deleteLocalStorage(){
    localStorage.removeItem(storageName)
}

function getLocalStorageData(){
    const localStorageData = localStorage.getItem(storageName);
    return JSON.parse(localStorageData);
}

async function getUserInfo(){
    if(localStorageExists()){
        const data = getLocalStorageData()
        return await requestGET(URL.userInfo,data);
    }
    
}

export { authenticate,setLocalStorage,verifyIfIsAuthenticated, request, deleteLocalStorage, getLocalStorageData, localStorageExists, getUserInfo }