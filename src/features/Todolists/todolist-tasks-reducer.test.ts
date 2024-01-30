
import {addTodolistAC, TodolistDomain_T, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../app/App";
import {v1} from "uuid";


test('its should be equals', ()=>{
    const startTasksState: TasksStateType = {}
    const startTodolistsDtate: TodolistDomain_T[] = []

    const action = addTodolistAC({id: v1(), title: "What to learn", addedDate: '', order: 0})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsDtate, action)

    const keys= Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolist).toBe(action.todolist.id )
})