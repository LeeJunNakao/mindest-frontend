import URL from '../../../../config/URL';
import axios from 'axios';

import { getLocalStorageData, localStorageExists } from '../auth';

const { token } = localStorageExists() ? getLocalStorageData() : { token: false}

class ImageController{

    static async sendImage(imageData){
        try {
            return await axios({
                method: 'post',
                url: URL.sendImage,
                data: {
                    imageData
                },
                headers: {
                    token
                }
            });
        } catch (error) {
            return error.response;
        }
        
    }

    static async getImageURL(){
        try {
            return await axios({
                method: 'get',
                url: URL.getImage,
                headers:{
                    token
                }
            })
        } catch (error) {
            
        }
        
    }
}

export default ImageController;