import { AxiosResponse } from "axios";
import { INote, Tag } from "../../entities/model/INote";
import $api from "../http";

export class NoteService {

    static async createNote(user_id: number, name: string, description: string, tags: Tag[]): Promise<AxiosResponse<INote>> {
        return $api.post<INote>('/note/create', { user_id, name, description, tags })
    }

    static async fetchAllUserNotes(user_id: number, sort: string): Promise<AxiosResponse<INote[]>> {
        return $api.post<INote[]>('/note/all', { user_id, sort })
    }

    static async fetchOneUserNote(user_id: number, note_id: string): Promise<AxiosResponse<INote>> {
        return $api.post<INote>('/note/one', { user_id, note_id })
    }

    static async deleteNote(note_id: string, user_id: number): Promise<AxiosResponse<INote>> {
        return $api.post<INote>('/note/delete', { note_id, user_id })
    }

    static async editNote(note_id: string, user_id: number, name: string, description: string, tags: Tag[]): Promise<AxiosResponse<INote>> {
        return $api.post<INote>('/note/edit', { note_id, user_id, name, description, tags })
    }
}