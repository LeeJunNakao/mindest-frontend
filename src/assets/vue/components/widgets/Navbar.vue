<template>
  <div class="container">
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">Mindest</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" id="navbar-icon-image"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <div class="nav-link">
                            <router-link to="/">Home</router-link> 
                        </div>

                    </li>
                    
                    <li class="nav-item">
                        <div class="nav-link">
                            <router-link :to="`/perfil/${userId}`">Perfil</router-link> 
                        </div>
                    </li>

                     <li class="nav-item">
                        <div class="nav-link">
                                <a href="#" @click="logout">Logout</a>
                        </div>
                    </li>

                </ul>
            </div>
        </nav>
  </div>
</template>

<script>
import { deleteLocalStorage, getLocalStorageData, localStorageExists } from '../../../js/Utils/auth'
export default {
    methods:{
        logout(){
            this.$store.commit('authenticate',false);
            deleteLocalStorage();
        }
    },
    data(){
        return{
            userId: ''
        }
    },
    created:function(){
        if(localStorageExists()){
            const { _id } = getLocalStorageData();
            this.userId = _id;
        }
    }
}
</script>

<style scoped>
nav{
min-height: 100px;
background-color: rgba(144, 144, 226, 1);
color: white;
margin-bottom: 10px;
}

nav a{
color: white;
}

#navbar-icon-image{
background-image: url('../../../img/navbar_icon_2.png');
background-size: cover;
background-position: center;
}


</style>