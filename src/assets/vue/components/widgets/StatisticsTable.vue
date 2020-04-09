<template>
  <div class="statistics-container container-fluid d-flex flex-column align-items-center">

      <div class="table-container col-lg-10">
            <div class="statistics-title">Estatísticas</div>
            <div v-for="(usergame, index) in statistics" :key="index" class="statistics-game-division">
                <div class="division-title border-bottom" :data-target="`${usergame.game}`" @click="hideContent">{{ findGameName(usergame.game).toUpperCase()  }}</div>
                
                <div style="display:none" :id="`${usergame.game}`">
                    <div class="division-day" v-for="(day,index) in getDays(usergame)" :key="index">
                        <div class="division-title" :data-target="`${usergame._id}_${index}`" @click="hideContent">DIA {{ day }}</div>
                        <div style="display:none" class="divison-table-container" :id="`${usergame._id}_${index}`">
                            <table class="table table-striped table-dark">
                                <thead>
                                    <th>DIFICULDADE</th>
                                    <th>PERFORMANCE</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(difficulty,dIndex) in usergame.statistics.days[day].difficulty" :key="dIndex">
                                        <td>{{ dIndex }}</td>
                                        <td>{{ difficulty.performance }} %</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
      
</template>

<script>
import StatisticsController from '../../../js/Utils/controller/statisticsController'
export default {
    computed:{
        games(){
            return this.$store.state.game.games;
        },
        userId(){
            return this.$route.params.id;
        },
    },
    created: async function(){
        const statisticsController = new StatisticsController();
        const statistics = await statisticsController.getInfo();

        this.statistics = statistics.data.response;
    },
    methods:{
        jsonfy(item){
            const stringfy = JSON.stringify(item);
            return JSON.parse(stringfy);
        },
        findGameName(id){
            const game =  this.$store.getters.getGameName(id)
            if(game.name) return game.name;
        },
        getDays(userGame){
            return Object.keys(userGame.statistics.days);
        },
        hideContent(event){
            const id = event.target.dataset.target;
            const element = document.getElementById(id);
            element.style.display!='none' ? element.style.display='none' : element.style.display = 'block'
        }
    },
    data(){
        return{
            statistics: '',
        }
    }
}
</script>

<style scoped>
.statistics-container{
    background-color: rgba(144, 144, 226, 0.3);
    padding-bottom: 40px;
    
}

.border-bottom{
    border-bottom: 1px solid rgba(144, 144, 226, 1)!important;
}

.statistics-container table{
    margin: 0 0 0 0;
}


.statistics-title{
    color: white;
    text-align: center;
    font-size: 30px;
    margin-top: 40px;
    background-color: rgba(50,50,50,1);
}

.statistics-game-division{
    background-color: white;
    color: black;
}
.division-title{
    height: 40px;
    line-height: 40px;
    font-size: 25px;
    padding-left: 15px;
    background-color: white;
    color: black;
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.division-title:hover{
    cursor: pointer;
}

.division-day .division-title{
    text-align: start;
    font-size: 20px;
    padding-left: 25px;
    background-color: rgba(144, 144, 226, 1);
    color: white;
}

.table-container{
    padding: 0;
}

table{
    margin-bottom: 0;
}
</style>