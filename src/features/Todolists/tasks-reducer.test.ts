import {addTaskAC, updateTaskAC, removeTaskAC, setTasksAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TasksStateType} from "../../app/App";
import {TaskPriorities, TaskStatuses} from "../../api/task-api";
import {v1} from "uuid";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "HTML&CSS", status: TaskStatuses.Completed,
                addedDate: '', completed: false, todoListId: "todolistId1",
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Later, startDate: ''
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                addedDate: '', completed: false, todoListId: "todolistId1",
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Later, startDate: ''
            },
            {
                id: "3", title: "REACT", status: TaskStatuses.New,
                addedDate: '', completed: false, todoListId: "todolistId1",
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Later, startDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "Bear", status: TaskStatuses.Completed,
                addedDate: '', completed: false, todoListId: "todolistId2",
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Later, startDate: ''
            },
            {
                id: "2", title: "Milk", status: TaskStatuses.Completed,
                addedDate: '', completed: false, todoListId: "todolistId2",
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Later, startDate: ''
            },
            {
                id: "3", title: "Book", status: TaskStatuses.New,
                addedDate: '', completed: false, todoListId: "todolistId2",
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Later, startDate: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()
})

test('correct task should be added from correct array', () => {
    const action = addTaskAC({
        title: 'Hi people',
        todoListId: 'todolistId2',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        description: '',
        completed: false,
        deadline: '',
        priority: 0,
        startDate: '',
        id: '111'
    })
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].title).toBe("Hi people")
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC("todolistId2", "2", {status: TaskStatuses.New})
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const action = updateTaskAC("todolistId2", "2", {title:"Hodor"})
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS")
    expect(endState["todolistId2"][1].title).toBe("Hodor")
})

test('new property array should be added when new todolist is added', () => {
    const action = addTodolistAC({id: v1(), title: "What to learn", addedDate: '', order: 0})
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")
    if (!newKey) {
        throw new Error("Error hahahass")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property  with todolist should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
})

test('empty arrays should be added when we set todolists',()=>{
    const action = setTodolistsAC([
        {id: '1', title: "What to learn", filter: 'all', addedDate: '', order: 0,entityStatus: 'idle'},
        {id: '2', title: "What to buy", filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})

test('tasks should be added for todolist',()=>{
    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": [],
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})