import axios from "axios";
import {TodolistDomain_T} from "../state/todolists-reducer";

const instance = axios.create( {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "3bc7f25e-df39-49d1-baad-913684cbf2df"
    }
})

//api
export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistDomain_T[]>('todo-lists')
    },
    postTodolists<a>(title:string) {
        return instance.post<ResponseType<{item: Todolist_T}>>('todo-lists', {title})
    },
    deleteTodolists(todolistId:string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolists(todolistId:string, title:string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}

//types
export type Todolist_T = {
    id: string
    title:string
    addedDate: string
    order: number
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
