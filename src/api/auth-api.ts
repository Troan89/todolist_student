import {ResponseType} from "./todolist-api";
import {instance} from "./instance";


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