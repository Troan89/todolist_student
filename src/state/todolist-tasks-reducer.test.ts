
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType } from "../AppWithRedux";

test('its should be equals', ()=>{
    const startTasksState: TasksStateType = {}
    const startTodolistsDtate: TodolistType[] = []

    const action = addTodolistAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsDtate, action)

    const keys= Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolist).toBe(action.todolistId)
})