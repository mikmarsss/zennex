
import { INote, Tag } from "../../entities/model/INote";
import { makeAutoObservable } from "mobx";
import { NoteService } from "../service/NoteService";
import { showToast } from "../../shared/ui/Toast/Toast";

export default class NoteStore {
    note = {} as INote
    notes = [] as INote[]

    setNote(note: INote) {
        this.note = note
    }

    setNotes(notes: INote[]) {
        this.notes = notes
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAllUserNotes(user_id: number, sort: string) {
        try {
            const response = await NoteService.fetchAllUserNotes(user_id, sort)
            this.setNotes(response.data)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async createNote(user_id: number, name: string, description: string, tags: Tag[]) {
        try {
            const response = await NoteService.createNote(user_id, name, description, tags)
            console.log(response)
            showToast('success', 'Заметка создана', 1000)
        } catch (e: any) {
            console.log(e.response?.data?.message)
            showToast('warning', e.response?.data?.message, 1000)
        }
    }

    async deliteNote(note_id: string, user_id: number) {
        try {
            const response = await NoteService.deleteNote(note_id, user_id)
            console.log(response)
            showToast('success', 'Заметка удалена', 1000)
        } catch (e: any) {
            console.log(e.response?.data?.message)
            showToast('warning', e.response?.data?.message, 1000)
        }
    }

    async editNote(note_id: string, user_id: number, name: string, description: string, tags: Tag[]) {
        try {
            const response = await NoteService.editNote(note_id, user_id, name, description, tags)
            console.log(response)
            showToast('success', 'Изменения сохранены', 1000)
        } catch (e: any) {
            console.log(e.response?.data?.message)
            showToast('warning', e.response?.data?.message, 1000)
        }
    }



}