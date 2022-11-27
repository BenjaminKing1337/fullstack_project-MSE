export default (to, from, next) => {
    if (localStorage.getItem("level") == "admin") {
        next()
    }
    else {
        next('/login')
    }
}