export default (to, from, next) => {
    if (localStorage.getItem("Token") == null && localStorage.getItem("Token") == undefined) {
        next()
    }
    else {
        next('/')
    }
}