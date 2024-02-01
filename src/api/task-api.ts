import {instance} from "./instance";

//api
export const tasksApi = {
    getTasks(id: string) {
        return instance.get<GetTasksResponse_T>(`todo-lists/${id}/tasks`)
    },
    createTasks(id: string, title: string) {
        return instance.post<ResponseType<{item: Task_T}>>(`todo-lists/${id}/tasks`, {title})
    },
    deleteTasks(id: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}/tasks/${taskId}`)
    },
    updateTasks(id: string, taskId: string, model: UpdateTaskModel_T) {
        return instance.put<ResponseType<Task_T>>(`todo-lists/${id}/tasks/${taskId}`, model)
    }
}

//types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type Task_T = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse_T = {
    error: string | null
    totalCount: number
    items: Task_T[]
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type UpdateTaskModel_T = {
    title: string
    description: string
    completed: boolean | undefined
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}