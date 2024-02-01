import {TasksStateType} from "../../app/App"
import {addTodolistAC, ClearTodolistsDataAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer"
import {Task_T, TaskPriorities, tasksApi, TaskStatuses, UpdateTaskModel_T} from "../../api/task-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {appSetStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: Task_T }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            model: UpdateDomainTaskTask_T
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Task_T[], todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addTodolistAC, (state, action)=>{
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistAC, (state, action)=>{
                delete state[action.payload.todolistId]
            })
            .addCase(setTodolistsAC, (state, action)=>{
                action.payload.todolists.forEach((tl:any) => state[tl.id] = [])
            })
            .addCase(ClearTodolistsDataAC, (state, action)=>{
                return {}
            })
        }
})
//reducer
export const tasksReducer = slice.reducer

export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC({status: "loading"}))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId}))
            dispatch(appSetStatusAC({status: "succeeded"}))
        })
}
export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTasks(todolistId, taskId)
        .then(res => dispatch(removeTaskAC({taskId, todolistId})))
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC({status: "loading"}))
    tasksApi.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(appSetStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, domainModel: UpdateDomainTaskTask_T, tasksId: string) =>
    ((dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todolistId].find(task => task.id === tasksId)
        if (!task) {
            console.warn('task not found')
            return
        }

        const apiModel: UpdateTaskModel_T = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            completed: task.completed,
            deadline: task.deadline,
            description: task.description,
            ...domainModel
        }
        tasksApi.updateTasks(todolistId, tasksId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId, taskId: tasksId, model: domainModel}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    })

//types
export type UpdateDomainTaskTask_T = {
    title?: string
    description?: string
    completed?: boolean | undefined
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null
    deadline?: string | null
}

