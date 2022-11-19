class User{
    constructor(id, email, password, userlevel){
        this.id = id;
        this.email = email;
        this.password = password;
        this.userlevel = userlevel;
    }
}

module.exports = User;