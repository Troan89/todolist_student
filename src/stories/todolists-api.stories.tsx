import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API-TODOLISTS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistApi.postTodolists(title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="title" value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={createTodolist}>Create Task</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistApi.deleteTodolists(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>delete task</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistApi.updateTodolists(todolistId, title)
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
            <button onClick={updateTodolistTitle}>Update Task title</button>
        </div>
    </div>
}



