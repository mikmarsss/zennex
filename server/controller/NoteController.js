const NoteService = require('../service/NoteService')

class NoteController {

    async createNote(req, res, next) {
        try {
            const { user_id, name, description, tags } = req.body
            const noteData = await NoteService.createNote(user_id, name, description, tags)
            return res.json(noteData)
        } catch (e) {
            next(e)
        }
    }

    async deleteNote(req, res, next) {
        try {
            const { note_id, user_id } = req.body
            const noteData = await NoteService.deleteNote(note_id, user_id)
            return res.json(noteData)
        } catch (e) {
            next(e)
        }
    }

    async editNote(req, res, next) {
        try {
            const { note_id, user_id, name, description, tags } = req.body
            const noteData = await NoteService.editNote(note_id, user_id, name, description, tags)
            return res.json(noteData)
        } catch (e) {
            next(e)
        }
    }

    async fetchUserNotes(req, res, next) {
        try {
            const { user_id } = req.body
            const noteData = await NoteService.fetchUserNotes(user_id)
            return res.json(noteData)
        } catch (e) {
            next(e)
        }
    }

    async fetchUserNote(req, res, next) {
        try {
            const { user_id, note_id } = req.body
            const noteData = await NoteService.fetchUserNote(user_id, note_id)
            return res.json(noteData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new NoteController()