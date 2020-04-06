<template>
  <div class="container-fluid login-container d-flex justify-content-center align-items-center">
     
    <div class="form-group col-lg-4 login-form d-flex flex-column justify-content-between">

        <div class="logo">MINDEST</div>

        <div class="input-container d-flex flex-column justify-self-center align-self-center">

            <div v-if="registerForm" class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">nome</span>
                </div>  
                <input type="text" name="name" v-model="name" class="form-control"/>
            </div>

            <div class="input-group mb-3">
                <input type="email" class="form-control" name="email" v-model="email" />
                <div class="input-group-append">
                    <span class="input-group-text">@email</span>
                </div>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">senha</span>
                </div>  
                <input type="password" name="password" v-model="password" class="form-control"/>
            </div>

            <div v-if="registerForm" class="input-group mb-3">
                <input type="password" name="confirm_password" class="form-control" placeholder="repita a senha" v-model="confirm_password" />
            </div>
        
            <div class="d-flex justify-content-center ">
                <input type="button" class="btn btn-light" @click="login" value="Enviar" />
            </div>

            <div v-if="registerForm" class="link"><a href="#" @click="showRegisterForm">Faça login</a></div>
            <div v-else class="link"><a href="#" @click="showRegisterForm">Registrar</a></div>

        </div>
    </div>

  </div>
</template>

<script>
import { authenticate, setLocalStorage, getStorageData } from '../../js/Utils/auth'

export default {
    data(){
        return {
            registerForm: false,
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    },
    computed:{
        authenticated(){
            return this.$store.state.auth.authenticated
        },
        userData(){
            return {
                name: this.name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            }
        }
    },
    methods:{
        showRegisterForm(){
            this.registerForm = !this.registerForm
        },
        login(){
            this.$store.commit('changeLoadState',true)
            
            let type = this.registerForm ? "register" : "login"
            authenticate(
                type,
                this.userData,
                (resp)=>this.commitAuthentication(resp),
                (state)=>this.$store.commit('changeLoadState',state)
            )
            
        },
        commitAuthentication(data){
            setLocalStorage(data)
        },

    }

};
</script>

<style scoped>

.login-container{
    height: 100vh;
    
    background-color: rgba(233,233,233);
    min-height: 400px;
}

.login-form{
    border: 1px solid rgba(52, 193, 213, 0.5);
    background-color: rgba(52, 193, 213, 1);
    border-radius: 5px;
    height: 60%;
    min-height: 400px;
}

.input-container{
    width: 75%;
    margin-bottom: 20px;
    
}

.logo{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: white;
    height: 20%;
}
.link{
    display: flex;
    color: white;
    justify-content: center;
    margin-top: 20px;
}

.link a{
    color: black;
}

.link a:hover{
    color: black;
    text-decoration: none;
}


</style>
