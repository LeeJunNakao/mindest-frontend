<template>

    <div v-if="show" class="personal-toast" :style="toastDisplay">
        <div class="personal-toast-header">
            <div class="personal-toast-logo"></div>
            <div class="personal-toast-title">ERROR</div>
        </div>

        <div class="personal-toast-content">
            <div class="toast-content-description">
                {{ error }}
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props:['error','show'],
    data(){
        return{
            toastDisplay:{
                display: 'block',
            }
        }
    },
    created:function(){
        setTimeout(()=>{
            this.show=false;
            this.$store.commit('clearErrorDescription')
        },6000)
    }
}
</script>

<style>
.personal-toast{
    z-index: 999;
    position: relative;
    max-height: 200px;
    width: 300px;
    border-radius: 5px;
}

.personal-toast-header{
    font-size: 15px;
    padding: 5px;
    padding-left: 15px;
    width: 100%;
    background-color: white;
    display: flex;

}
.personal-toast-logo{
    height: 25px;
    width: 25px;
    background-image: url('../../../img/logo.png');
    background-position: center;
    background-size: contain;
}

.personal-toast-title{
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    margin-left: 10px;
}
.personal-toast-content{
    height: 80px;
    width: 100%;
    font-size: 15px;
    padding: 15px;
    background-color: rgba(52, 193, 213, 0.5);
    
}
</style>