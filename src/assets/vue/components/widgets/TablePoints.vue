<template>
<div class="resume-container container-fluid d-flex flex-column align-items-center">
    <div class="table-title col-lg-10">Records de {{ username }}</div>
    <table class="table table-striped table-dark col-lg-10">
        <tbody>
            <tr v-for="item in userPoints.records" v-bind:key="item._id">
                <td>{{ findGameName(item.game)  }}</td>
                <td>{{ item.points }} pontos</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    props:['userPoints'],
    methods:{
        findGameName(id){
            const game =  this.$store.getters.getGameName(id)
            if(game.name) return game.name;
        }
    },
    created:function(){
        this.$store.commit('setUsername',data.name);
    },
    computed:{
        username(){
            return this.$store.state.auth.username
        }
    }



}
</script>

<style scoped>
.resume-container{
    background-color: rgba(144, 144, 226, 0.3);
}

.resume-container table{
    margin: 0 0 40px 0;
}

.table-title{
    color: white;
    text-align: center;
    font-size: 30px;
    margin-top: 40px;
    background-color: rgba(50,50,50,1);
}
</style>
