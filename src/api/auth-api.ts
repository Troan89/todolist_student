import axios from 'axios'
import {ResponseType} from "./todolist-api";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "3bc7f25e-df39-49d1-baad-913684cbf2df"
    }
})

//api
export const authApi = {
    login(data: LoginParams_T) {
        return instance.post<ResponseType<{userId?:number}>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<Login_T>>('auth/me')
    },
    logOut() {
        return instance.delete<ResponseType<{}>>('auth/login')
    }
}

//types
export type LoginParams_T = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type Login_T = {
    id: number
    email: string
    login: string
}