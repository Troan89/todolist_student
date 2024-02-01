import {Todolist_T, todolistApi} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppSetStatus_T, appSetStatusAC, Status_T} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistDomain_T[] = []

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: Todolist_T }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        ChangeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(td => td.id === action.payload.id)
            state[index].title = action.payload.title
        },
        ChangeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(td => td.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        ChangeTodolistEntityStatusAC(state, action: PayloadAction<{ status: Status_T, id: string }>) {
            const index = state.findIndex(td => td.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistDomain_T[] }>) {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: "idle"}
            })
        },
        ClearTodolistsDataAC(state, action: PayloadAction<{}>) {
            return []
        }
    }
})

//reducer
export const todolistsReducer = slice.reducer

export const {
    removeTodolistAC,
    addTodolistAC,
    ChangeTodolistTitleAC,
    ChangeTodolistFilterAC,
    ChangeTodolistEntityStatusAC,
    setTodolistsAC,
    ClearTodolistsDataAC
} = slice.actions

//thunks
export const fetchTodolistsTC = () => (dispatch: any) => {
    dispatch(appSetStatusAC({status: "loading"}))
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(appSetStatusAC({status: "succeeded"}))
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
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC({status: "loading"}))
    dispatch(ChangeTodolistEntityStatusAC({status: "loading", id: todolistId}))
    todolistApi.deleteTodolists(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({todolistId: todolistId}))
            dispatch(appSetStatusAC({status: "succeeded"}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC({status: "loading"}))
    todolistApi.postTodolists(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(appSetStatusAC({status: "succeeded"}))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodolists(todolistId, title)
        .then(res => dispatch(ChangeTodolistTitleAC({id: todolistId, title: title})))
}

//types

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomain_T = Todolist_T & {
    filter: FilterValuesType
    entityStatus: Status_T
}

