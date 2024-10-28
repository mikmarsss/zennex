import $api from "../http";
import { AuthResponse } from "../../entities/response/AuthResponse";
import { AxiosResponse } from "axios";

export class AuthService {

    static async registration(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/registration', { email, password, username })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/login', { email, password })
    }

    static async logout(): Promise<void> {
        return $api.post('/user/logout')

    }
}