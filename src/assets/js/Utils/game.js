import axios from 'axios'
import URL from '../../../config/URL'
import { request } from '../Utils/auth'
const storageName = 'mindest'

async function getGameInfo(data,callback){
    try{
        const response = await requestGET(URL.gameInfo,data)
        callback(response.data)
    }catch(e){
        console.log('erro ao solicitar informações do jogo', e)
    }
}


async function requestGET(url,params=null){
    let token =false
    const storage = localStorage.getItem(storageName) 
    if(storage) token = JSON.parse(storage).token
    try{
        return await axios({
            method:'get',
            url,
            headers: {
                'Content-Type':'application/json',
                'Accept':'*/*',
                token
            },
            params
        })
    }catch(err){
        console.log('Em request()',err.response.data.errors)
    }
}

async function sendAnswerToServer(data, callback){
    try{
        const response = await request('post', URL.receiveUserAnswer,data)
        callback(response);
    }catch(e){
        console.log('erro ao enviar as respostas',e)
    }
}

async function getGameNames(data,callback){
    const response = await requestGET(URL.game,data,callback)
    callback(response.data[0])
}

export { getGameInfo, sendAnswerToServer,getGameNames, requestGET }