import Request from '../Class/Request';
import URL from '../../../../config/URL'

class UserController extends Request{
    constructor(){
        super();
    }

    async getInfo(params){
        const headers = { token: this.token }
        return await super.get(URL.userInfo,params,headers)
    }
}

export default UserController;