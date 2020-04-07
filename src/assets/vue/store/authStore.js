export default {
    state: {
        authenticated: false,
        count: 0,
        loading: false,
        username: '',
        avatarURL: '',
        hasError: false,
        errorDescription: [],
        userEmail: '',
        id: '',
    },
    mutations:{
        authenticate: (state,value)=> state.authenticated= value,
        changeLoadState: (state,value)=> state.loading = value,
        setUsername: (state,value)=>state.username= value,
        notifyHasError: (state)=>state.hasError = true,
        clearErrorDescription: (state)=>{
            state.errorDescription.splice(0,1)        },
        pushErrorDescription: (state,error)=>state.errorDescription.push(error),
        setAvatarURL: (state,URL)=>state.avatarURL = URL,
        setUserEmail: (state,email)=>state.userEmail = email,
        setId: (state,id)=> state.id = id,
    },
}