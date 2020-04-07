<template>
  <div class="container">

      <div class="profile-container d-flex align-items-center">

        <div class="avatar-container d-flex justify-content-center">
            <img :src="avatar">
        </div>

        <div class="profile-info">
            <div class="info-name">{{ username }}</div>
        </div>

        <div class="profile-actions">
            <div class="info-actions">
                
                <div v-if="id == loggedId" class="avatar-button-group">
                    <label for="avatar-input" class="avatar-button-label">Alterar avatar</label>
                    <input id="avatar-input" type="file">
                    <button class="send-avatar-button" id="avatar-button-send" @click="sendAvatar">enviar</button>
                </div>
            </div>
        </div>

      </div>


  </div>
</template>

<script>
import { getLocalStorageData, localStorageExists } from '../../js/Utils/auth';
import { requestGET } from '../../js/Utils/game';
import imageController from '../../js/Utils/controller/imageController';
import ImageController from '../../js/Utils/controller/imageController';
import UserController from '../../js/Utils/controller/UserController'

export default {
    data(){
        return{
            avatar:'',
            username: ''
        }
    },
    computed:{
        
        loggedId(){
            return this.$store.state.auth.id;
        },

        id(){
            return this.$route.params.id;
        }
    },
    methods:{
        sendAvatar(){
            const input = document.querySelector('#avatar-input');
            const image = input.files[0];
            const fileReader = new FileReader();

            fileReader.onload = async ()=>{
                const imageData = { image: fileReader.result, name: image.name}
                const url = await ImageController.sendImage(imageData);
                if(url.data.response){
                    this.avatar = url.data.response;
                }if(url.data.errors){
                    let erro = url.data.errors[0]
                    this.$store.commit('pushErrorDescription',erro);
                    this.$store.commit('notifyHasError');
                }
            }

            if(image) fileReader.readAsDataURL(image)
        },
        async getImage(){
            const image = await ImageController.getImageURL();
            this.avatar = image.data.avatar;
        },
        async getUserData(){
            const userController = new UserController();
            const response = await userController.getInfo({ _id: this.id });
            const { name, avatar } = response.data.user;
            this.username = name;
            this.avatar = avatar;
        }
    },
    created: function(){  
        this.getUserData();    
    },
    updated:function(){
        this.getUserData();
    }
}
</script>

<style scoped>
.perfil{
    font-size: 50px;
    color: red;
}

.profile-container{ 
    height: 100px;
    border: 1px solid black;
    background-color: rgba(50,50,50,1);
    color: white;
}

.avatar-container{
    border-right: 1px solid rgba(200, 200, 200,0.5);
    width: 100px;
}
.avatar-container img{
    height: 80px;
    width: 80px;
    border-radius: 40px;
}

.profile-info{
    border-right: 1px solid rgba(200, 200, 200,0.5);
    padding-right: 20px;
}

.profile-info, .profile-actions{
    height: 80px;
    margin-left: 20px;
}



#avatar-input{
    display: none;
}

.avatar-button-group{
    display: flex;
}

.avatar-button-group label{
    border-radius: 3px 0 0 3px;
    border-right: 1px solid white;
}
.avatar-button-group button{
    border-radius: 0px 3px 3px 0;
}

.avatar-button-label, .send-avatar-button{
    border: 1px solid rgba(144, 144, 226,0.5);
    padding: 3px 15px 3px 15px;
    margin-top: 5px;
    background-color: rgba(144, 144, 226, 1);
    font-size: 10px;
    max-height: 23px;
    color: white;
}

.avatar-button-label:hover, .send-avatar-button:hover{
    background-color: rgb(168, 168, 228);
    color:black;
}


@media only screen and (max-width: 600px){
    .avatar-button-label, #avatar-button-send{
        max-height: 40px;
        height: 40px;
    }

    .avatar-button-group{
        padding-right: 20px;
    }
}

</style>