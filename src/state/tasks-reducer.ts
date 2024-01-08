import {TasksStateType} from "../app/App"
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer"
import {Task_T, TaskPriorities, tasksApi, TaskStatuses, UpdateTaskModel_T} from "../api/task-api";
import {Dispatch} from "redux";
import {ArrRootState} from "./store";

const initialState: TasksStateType = {}

//reducer
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id != action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return <TasksStateType>{...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)}
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// action
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: Task_T) => ({type: 'ADD-TASK', task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskTask_T) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}
export const setTasksAC = (tasks: Task_T[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksApi.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
}
export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksApi.deleteTasks(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId)))
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksApi.createTasks(todolistId, title)
        .then((res) => dispatch(addTaskAC(res.data.data.item)))
}
export const updateTaskTC = (todolistId: string, domainModel: UpdateDomainTaskTask_T, tasksId: string) =>
    ((dispatch: Dispatch<ActionsType>, getState: () => ArrRootState) => {
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
                dispatch(updateTaskAC(todolistId, tasksId, domainModel))
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
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
