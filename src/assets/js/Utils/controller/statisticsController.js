import Request from '../Class/Request';
import URL from '../../../../config/URL'

class StatisticsController extends Request{
    constructor(){
        super();
    }

    async getInfo(params){
        return await super.get(URL.getLastWeekGamesStatistics,params,this.headers)
    }

    
}

export default StatisticsController;