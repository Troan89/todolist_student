import {Todolist_T, todolistApi} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppSetStatus_T, appSetStatusAC, Status_T} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC, SetTasks_T} from "./tasks-reducer";

const initialState: TodolistDomain_T[] = []

//reducer
export const todolistsReducer = (state: TodolistDomain_T[] = initialState, action: ActionsType): TodolistDomain_T[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.id ? {...td, title: action.title} : td)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(td => td.id === action.id ? {...td, entityStatus: action.status} : td)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: "idle"}
            })
        case "CLEAR_DATA":
            return []
        default:
            return state
    }
}

// action
export const ClearTodolistsDataAC = () => ({type: 'CLEAR_DATA'} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: Todolist_T) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
} as const)
export const ChangeTodolistEntityStatusAC = (status: Status_T, id: string) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    status,
    id
} as const)
export const setTodolistsAC = (todolists: TodolistDomain_T[]) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: any) => {
    dispatch(appSetStatusAC("loading"))
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appSetStatusAC("succeeded"))
            return res.data
        })
        .then((todolists) => {
            todolists.forEach((tl) => {

                dispatch(fetchTasksTC(tl.id))
            })
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(appSetStatusAC("loading"))
    dispatch(ChangeTodolistEntityStatusAC("loading", todolistId))
    todolistApi.deleteTodolists(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(appSetStatusAC("succeeded"))
        })
}
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(appSetStatusAC("loading"))
    todolistApi.postTodolists(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(appSetStatusAC("succeeded"))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    todolistApi.updateTodolists(todolistId, title)
        .then(res => dispatch(ChangeTodolistTitleAC(todolistId, title)))
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ClearTodolistsDataType = ReturnType<typeof ClearTodolistsDataAC>
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof ChangeTodolistEntityStatusAC>
    | ClearTodolistsDataType
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomain_T = Todolist_T & {
    filter: FilterValuesType
    entityStatus: Status_T
}
type ThunkDispatch = Dispatch<ActionsType | AppSetStatus_T>
