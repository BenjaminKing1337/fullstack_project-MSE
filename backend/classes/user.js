class User{
    constructor(id, email, password, passcheck, userlevel){
        this.id = id;
        this.email = email;
        this.password = password;
        this.passcheck = passcheck;
        this.userlevel = userlevel;
    }
}

module.exports = User;