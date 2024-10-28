module.exports = class UserDTO {
    id;
    email;
    username;
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.username = model.username;
    }
}