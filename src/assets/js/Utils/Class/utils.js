const storageName = 'mindest'

function localStorageExists(){
    const token = localStorage.getItem(storageName) || false
    return token ? true : false
}

function getLocalStorage(){
    return JSON.parse(localStorage.getItem(storageName))
}

export { localStorageExists, getLocalStorage }