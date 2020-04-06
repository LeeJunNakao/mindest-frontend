import Profile from '../components/Profile.vue'
import Home from '../components/Home.vue'
import Game from '../components/Game.vue'
export default {
    routes: [
        {path: '/perfil',component: Profile},
        {path: '/', component: Home},
        {name: 'game', path: '/game/:id', component: Game}
    ]
}

