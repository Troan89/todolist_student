import {v1} from "uuid";
import {FilterValuesType, TodolistType } from "../AppWithRedux";


export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}



const initialState: TodolistType[] = [
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.id ? {...td, title: action.title} : td)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        default:
            return state
    }
}

export const removeTodolistAC= (todolistId:string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC= (title:string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC= (title:string, todolistId:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId}
}
export const changeTodolistFilterAC= (filter:FilterValuesType, todolistId:string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId}
}


