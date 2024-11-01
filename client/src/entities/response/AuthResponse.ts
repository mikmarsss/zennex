import { IUser } from "../model/IUser";

export interface AuthResponse {
    user: IUser,
    accessToken: string;
    refreshToken: string;
}