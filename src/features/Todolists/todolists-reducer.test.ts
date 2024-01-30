import {v1} from 'uuid';
import {
    addTodolistAC, ChangeTodolistEntityStatusAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomain_T,
    todolistsReducer
} from "./todolists-reducer";
import {Status_T} from "../../app/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomain_T[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: "What to learn", filter: 'all', addedDate: '', order: 0,entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let NewTodolistTitle = "What to learn"

    const endState = todolistsReducer(startState, addTodolistAC({
        id: todolistId1,
        title: NewTodolistTitle,
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(NewTodolistTitle)
})

test('correct todolist should change its name', () => {
    let NewTodolistTitle = "Yoyoyoyoy"

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(NewTodolistTitle, todolistId2))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(NewTodolistTitle)
})

test('correct filter of todolist should be change', () => {
    let NewFilter: FilterValuesType = "active"

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(NewFilter, todolistId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("active")
})

test('todolists should be set to the state', () => {

    const endState = todolistsReducer([], setTodolistsAC(startState))

    expect(endState.length).toBe(2)
})

test('correct entity of todolist should be change', () => {
    let NewStatus: Status_T = "loading"

    const endState = todolistsReducer(startState, ChangeTodolistEntityStatusAC(NewStatus, todolistId2))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})