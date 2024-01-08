import {Todolist_T, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomain_T[] = []

//reducer
export const todolistsReducer = (state: TodolistDomain_T[] = initialState, action: ActionsType): TodolistDomain_T[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.id ? {...td, title: action.title} : td)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        case "SET-TODOLISTS":
            return action.todolists.map(tl=>{
                return {...tl, filter: "all"}
            })
        default:
            return state
    }
}

// action
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: Todolist_T) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
export const setTodolistsAC = (todolists: TodolistDomain_T[]) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
        todolistApi.getTodolists()
            .then(res=>dispatch(setTodolistsAC(res.data)))
    }
export const removeTodolistTC = (todolistId:string) => (dispatch: Dispatch<ActionsType>) => {
        todolistApi.deleteTodolists(todolistId)
            .then(res=>dispatch(removeTodolistAC(todolistId)))
    }
export const addTodolistTC = (title:string) => (dispatch: Dispatch<ActionsType>) => {
        todolistApi.postTodolists(title)
            .then(res=>dispatch(addTodolistAC(res.data.data.item)))
    }
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
        todolistApi.updateTodolists(todolistId, title)
            .then(res=>dispatch(changeTodolistTitleAC(todolistId, title)))
    }

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomain_T = Todolist_T & {
    filter: FilterValuesType
}