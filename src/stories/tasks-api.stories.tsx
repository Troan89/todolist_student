import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/task-api";
import {todolistApi} from "../api/todolist-api";


export default {
    title: 'API-TASKS'
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasksTodolist = () => {
        tasksApi.getTasks(todolistId)
            .then((response) => {
                setState(response.data.items)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasksTodolist}>Get Tasks</button>
        </div>
    </div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        tasksApi.createTasks(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder="title" value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        tasksApi.deleteTasks(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder="taskId" value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('title 1')

    const [taskDescription, setTaskDescription] = useState<string>('description 1')
    const [completed, setCompleted] = useState<boolean | undefined>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTaskTitle = () => {
        tasksApi.updateTasks(todolistId, taskId, {
            title,
            description: taskDescription,
            completed: completed,
            status,
            priority,
            startDate: null,
            deadline: null,
        })
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder="taskId" value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder="title" value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>

            <input placeholder="taskDescription" value={taskDescription} onChange={(e) => {
                setTaskDescription(e.currentTarget.value)
            }}/>
            <input type={'checkbox'} placeholder="Completed" checked={completed} onChange={(e) => {
                setCompleted(e.currentTarget.checked)
            }}/>
            <input placeholder="Status" value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder="priority" value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
            <input placeholder="startDate" value={startDate} onChange={(e) => {
                setStartDate(e.currentTarget.value)
            }}/>
            <input placeholder="deadline" value={deadline} onChange={(e) => {
                setDeadline(e.currentTarget.value)
            }}/>

            <button onClick={updateTaskTitle}>Update Task title</button>
        </div>
    </div>
}