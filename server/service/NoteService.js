const { Note } = require('../models/NoteModel')
const NoteDTO = require('../dto/NoteDTO')
class NoteService {

    async createNote(user_id, name, description, tags) {

        const note = await Note.create({ user_id: user_id, name: name, description: description, tags: tags })
        const noteDto = new NoteDTO(note)
        return { note: noteDto }
    }

    async deleteNote(note_id, user_id) {
        const note = await Note.destroy({ where: { id: note_id, user_id: user_id } })
        const noteDto = new NoteDTO(note)
        return { note: noteDto }
    }

    async editNote(note_id, user_id, name, description, tags) {
        const note = await Note.findOne({ where: { id: note_id, user_id: user_id } })
        note.update({ name: name })
        note.update({ description: description })
        note.update({ tags: tags })
        const noteDto = new NoteDTO(note)
        return ({ note: noteDto })
    }

    async fetchUserNotes(user_id, sort) {
        const notes = await Note.findAll({
            where: { user_id: user_id },
            order: [
                ['updatedAt', sort],
                ['createdAt', sort]
            ]
        });
        return notes;
    }

    async fetchUserNote(user_id, note_id) {
        const note = await Note.findOne({ where: { user_id: user_id, id: note_id } })
        const noteDto = new NoteDTO(note)
        return noteDto
    }

}

module.exports = new NoteService()