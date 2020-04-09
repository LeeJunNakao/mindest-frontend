
const url = 'http://localhost:3000'

const URL = {
    validateToken: `${url}/validateToken`,
    login: `${url}/login`,
    register: `${url}/register`,
    home: `${url}/api/home`,
    game: `${url}/api/game`,
    gameInfo: `${url}/api/gameInfo`,
    receiveUserAnswer: `${url}/api/receiveUserAnswer`,
    sendImage: `${url}/api/sendImage`,
    getImage: `${url}/api/getImage`,
    userInfo: `${url}/api/userInfo`,
    getLastWeekGamesStatistics: `${url}/api/statistics/lastWeekGames`
}

module.exports = URL

