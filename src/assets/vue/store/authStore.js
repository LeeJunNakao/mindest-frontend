export default {
    state: {
        authenticated: false,
        count: 0,
        loading: false,
        username: '',
        hasError: false,
        errorDescription: []
    },
    mutations:{
        authenticate: (state,value)=> state.authenticated= value,
        changeLoadState: (state,value)=> state.loading = value,
        setUsername: (state,value)=>state.username= value,
        notifyHasError: (state,value)=>state.hasError = true,
        clearErrorDescription: (state)=>{
            state.errorDescription.splice(0,1)        },
        pushErrorDescription: (state,error)=>state.errorDescription.push(error)
    },
}