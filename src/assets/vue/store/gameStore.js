export default {
    state: {
        games: [],
        teste: 1
    },
    mutations:{
        changeGames(state,value){
            state.games = value;
        }
    },
    getters:{
        teste: (state)=>(id)=>{
            return state.teste * 3;
        },
        getGameName: (state)=>(id)=>{
            return state.games.find(element=> element._id == id)
        }
    }
}