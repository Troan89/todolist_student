import {v1} from "uuid"
import { TasksStateType } from "../AppWithRedux"

import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer"


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type AddTasksActionType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}
export type ChangeStatusActionType = {
    type: "CHANGE-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType
    | AddTasksActionType
    | ChangeStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id != action.taskId)}
        }
        case "ADD-TASK": {
            debugger
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        }
        case "ADD-TODOLIST": {
            debugger
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (todolistId: string, title: string): AddTasksActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}
export const changeStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeStatusActionType => {
    return {type: 'CHANGE-STATUS', todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}


