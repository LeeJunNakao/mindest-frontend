<template>
   <div class="container-principal">
       <ToastContainer />
       <Login v-if="authenticated==false"></Login>
       <div class="container" v-else>
            <Navbar></Navbar>
            <router-view></router-view>
       </div>
       <div v-if="loading" class="modal-teste">
           <div class="modal-main">Carregando...</div>
       </div>
   </div>

   

  
</template>

<script>
import { verifyIfIsAuthenticated, getUserInfo } from '../js/Utils/auth'
export default {
    computed:{
            authenticated(){
                return this.$store.state.auth.authenticated
            },
            loading(){
                return this.$store.state.auth.loading
            },
            userName(){
                return this.$store.state.auth.username
            },
            email(){
                return this.$store.state.auth.userEmail
            },
            avatar(){
                return this.$store.state.auth.avatarURL
            }
    },
    created: function(){
        verifyIfIsAuthenticated(this.commitAuthenticate,this.commitChangeLoadState)
        this.setUserInfo();
    },
    methods:{
        commitAuthenticate(value){
            this.$store.commit('authenticate',value);
        },
        commitChangeLoadState(value){
            this.$store.commit('changeLoadState',value);
        },
        async setUserInfo(){
            const { data } = await getUserInfo();
            const { user } = data;

            this.$store.commit('setUsername',user.name);
            this.$store.commit('setUserEmail',user.email);
            this.$store.commit('setAvatarURL',user.avatar);
            this.$store.commit('setId', user._id);
        }
    }
}
</script>

<style>
.container-principal{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: rgba(144, 144, 226, 0.3);
}

.modal-teste{
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: rgba(10, 10, 10, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    cursor: wait;
}

.modal-main{
    width: 100px;
    height: 100px;
    background-color: white;
    line-height: 100px;
    text-align: center;
    border-radius: 50px;
   
}
</style>