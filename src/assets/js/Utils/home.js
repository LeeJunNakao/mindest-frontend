import { request } from './auth'
const URL = require('../../../config/URL')

const storageName = 'mindest'

async function getUserData(callback){
    try{
        const response = await request('get',URL.home)
        callback(response.data)
    }catch(e){
        console.log('erro ao solicitar dados',e)
    }
}

async function getGames(callback){
 try{
    const data = await request('get',URL.game)
    callback(data.data)
 }catch(e){
    console.log('erro ao solicitar jogos',e)
 }
}
export { getUserData, getGames }