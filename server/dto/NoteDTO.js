module.exports = class NoteDTO {
    id;
    name;
    description;
    tags
    user_id;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.tags = model.tags;
        this.user_id = model.user_id;
    }
}