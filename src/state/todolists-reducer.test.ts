import {v1} from 'uuid';
import {FilterValuesType, TodolistType } from '../AppWithRedux';

import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let NewTodolistTitle = "Yoyoyoyoy"

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const endState = todolistsReducer(startState, addTodolistAC(NewTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(NewTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let NewTodolistTitle = "Yoyoyoyoy"

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const endState = todolistsReducer(startState, changeTodolistTitleAC(NewTodolistTitle, todolistId2))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(NewTodolistTitle)
})

test('correct filter of todolist should be change', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let NewFilter: FilterValuesType = "active"

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(NewFilter, todolistId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("active")
})