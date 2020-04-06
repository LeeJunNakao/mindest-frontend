<template>
    <div class="container home-container d-flex flex-column">

       <div class="control-panel d-flex flex-column">
           <div class="panel-title">Jogos</div>
           <div class="dropdown-divider"></div>
           <div class="container">
                <div class="row panel-content">
                    <div v-for="game in games" v-bind:key="game._id" class="panel-item col-xl-2">
                        <router-link :to="{name: 'game', params: {id: game._id }}">{{ game.name }}</router-link>  
                    </div>
                </div>
           </div>
        </div>   

        <TablePoints v-bind:user-points="userData"></TablePoints>
    </div>
</template>

<script>
import { getUserData, getGames } from '../../js/Utils/home'
export default {
    data(){
        return {
            userData: []
        }
    },
    created: function(){
        getUserData((data)=>this.userData = data)
        getGames((data)=> this.$store.commit('changeGames',data))
    },
    computed:{
        games(){
            return this.$store.state.game.games
        }
    }
}
</script>

<style scoped>
.container-principal > .container{
    height: 100%;
    min-height: 100vh;
}

.home-container{
    height: 100%;
}

.control-panel{
    color: white;
    display: flex;
    flex-direction: column;
    background-color: rgba(50,50,50,1);
}

.panel-content{
    margin-bottom: 10px;
}
.panel-title{
    padding: 10px; 
}

.panel-item{
    height: 50px;
    line-height: 50px;
    text-align: center;
}

.resume-container{
    min-height: 60vh;
}
</style>