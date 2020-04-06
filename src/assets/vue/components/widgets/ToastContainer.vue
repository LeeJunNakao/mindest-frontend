<template>
  <div class="toast-container" v-if="showError">
      <Toast v-for="(error, index) in errorDescription" 
      :key="index" 
      :error="error" 
      :show="true"
      />
  </div>
</template>

<script>
export default {
    computed:{
        showError(){
            return this.$store.state.auth.hasError;
        },
        errorDescription(){
            return this.$store.state.auth.errorDescription;
        }
    },
    
    
}
</script>

<style>
.toast-container{
    z-index: 999;
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;
}
</style>