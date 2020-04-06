<template>

<div class="container d-flex flex-column">

    <div class="game-header d-flex flex-column">
        <div class="game-title"> {{ gameName }} </div>

        <div v-if="!start" class="game-controler d-flex">
            <div class="difficulty-box">DIFICULDADE</div>
            <div><input type="text" class="level-input" maxlength="3" v-model="level"/></div>
            <div><input type="button" class="btn btn-primary" value="ok" @click="select"></div>
        </div>
    </div>

    <div v-if="!start && selected" class="game-nav">
        <div class="instruction">Decore os itens abaixo na ordem correta e clique em começar.</div>
        <div class="nav-visor">{{ removeSpecialCharsFromArray(gameItens) }}</div>
        <input type="button" value="COMEÇAR" class="btn btn-success start-button" @click="startGame">
    </div>

    <div v-if="start" class="game-visor">
        <input type="text" v-model="answer">
        <input type="button" class="btn btn-success" value="enviar" @click="sendAnswer">
    </div>

    <div v-if="finalized" class="game-score">
        <div>{{ points }} pontos</div>
    </div>



</div>
</template>

<script>
import { getGameInfo,sendAnswerToServer, getGameNames } from '../../js/Utils/game'

export default {
    data(){
        return {
            start: false,
            gameId: this.$route.params.id,
            selected: false,
            finalized: false,
            level: 0,
            gameItens:[],
            answer:'',
            gameName: '',
            points: 0,
        }
    },
    methods:{
        startGame(){
            this.start = true;
            this.finalized = false;
        },
        select(){
            let data = { level: this.level, gameName: this.gameName }
            getGameInfo(data,(response)=>this.sendInfoGameToState(response))
            
        },
        sendInfoGameToState(data){
            this.gameItens = data.itens
            this.selected = true
        },
        sendAnswer(){
            let answerItens = this.answer.split(' ')
            const data = { answerItens, gameItens: this.gameItens,
                game:{
                    _id:this.gameId,
                    level: this.level
                }
            }
            sendAnswerToServer(data, this.receiveResponse)
        },
        receiveResponse(response){
            this.points = response.data.points;
            this.finalized = true;
            
            this.start = false;
            this.selected= false;
            this.level = 0;
            this.answer = '';
        },
        setDefaultData(){
            this.start = false;
            this.selected= false;
            this.level = 0;
            this.answer = '';
            this.points=0;
        },
        removeSpecialCharsFromArray(array){
            const stringfiedArray = JSON.stringify(array);
            array = stringfiedArray.split("");
            let finalString = '';
            array.forEach(item=>{
                if(item!="[" && item!='"' && item!="'" && item!="]" && item!=","){
                finalString+=item;
                }
                if(item==","){
                finalString+=" ";
                }
            });
            return finalString;
        }   
    },
    created:function(){
        getGameNames({_id: this.gameId},(data)=>this.gameName = data.name);
        
    }
}
</script>

<style scoped>
.game-header{
    width: 100%;
    align-items: center;
}

.game-title{
    text-align: center;
    font-size: 40px;
    color: white;
    background-color: #481380;
    width: 100%;
    height: 100px;
    line-height: 100px;

}

.game-controler{
    width: 100%;
    height: 150px;
    justify-content: center;
    align-items: center;
    background-color: #ff1e56;
}

.difficulty-box{
    font-size: 20px;
}
.level-input{
    box-shadow: none;
    margin: 0 30px 0 30px;
    height: 38px;
    width: 38px;
    border: 2px solid rgb(48, 48, 173);
    border-radius: 50px;
    text-align: center;
    font-size: 20px;
    
}

.level-input:focus{
    outline: none;
}


.game-controler input[type="button"]{
    width: 50px;
}

.game-nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #481380;
}
.nav-visor{
    min-width: 300px;
    min-height: 50px;
    background-color: white;
    margin-bottom: 20px;
}
.instruction{
    margin: 20px;
    color: white;
}
.game-visor{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
}
.start-button{
    width: 300px;
}

.game-score{
    height: 100px;
    font-size: 40px;
    color: white;
    background-color: #fa163f;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>