import axios from "axios";
import { IUser } from "../../entities/model/IUser";
import { AuthService } from "../service/AuthService";
import { AuthResponse } from "../../entities/response/AuthResponse";
import { makeAutoObservable } from "mobx";
import { showToast } from "../../shared/ui/Toast/Toast";

export default class UserStore {
    user = {} as IUser
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            showToast('success', 'Есть контакт', 1000)
        } catch (e: any) {
            console.log(e.response?.data?.message)
            showToast('warning', e.response?.data?.message, 1000)
        }
    }

    async registration(email: string, password: string, username: string) {
        try {
            const response = await AuthService.registration(email, password, username)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            showToast('success', 'Есть контакт', 1000)
        } catch (e: any) {
            console.log(e.response?.data?.message)
            showToast('warning', e.response?.data?.message, 1000)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`http://localhost:5000/api/user/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }
}