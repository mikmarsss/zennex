
import { INote, Tag } from "../../entities/model/INote";
import { makeAutoObservable } from "mobx";
import { NoteService } from "../service/NoteService";
import { toast } from "react-toastify";

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

    async fetchUserNotes(user_id: number) {
        try {
            const response = await NoteService.fetchUserNotes(user_id)
            this.setNotes(response.data)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async createNote(user_id: number, name: string, description: string, tags: Tag[]) {
        try {
            const response = await NoteService.createNote(user_id, name, description, tags)
            console.log(response)
            toast.success('Заметка создана', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast.warning(e.response?.data?.message, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    async deliteNote(note_id: string, user_id: number) {
        try {
            const response = await NoteService.deleteNote(note_id, user_id)
            console.log(response)
            toast.success('Заметка удалена', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast.warning(e.response?.data?.message, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    async editNote(note_id: string, user_id: number, name: string, description: string, tags: Tag[]) {
        try {
            const response = await NoteService.editNote(note_id, user_id, name, description, tags)
            console.log(response)
            toast.success('Изменения сохранены', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast.warning(e.response?.data?.message, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }



}