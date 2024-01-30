import {Provider} from "react-redux";

import React from 'react'
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import {v1} from "uuid";
import {todolistsReducer} from "../features/Todolists/todolists-reducer";
import {AppRootState} from "./store";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {appReducer} from "./app-reducer";
import {thunk} from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const initialGlobalState = {
    todolists: [
        {
            id: "todolistId1", title: "What to learn", filter: "all",  addedDate: '', order: 0, entityStatus: 'idle'
        },
        {
            id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus:'loading'
        }
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                addedDate: '', order: 0, todoListId: "todolistId1",
                completed: false, deadline: '', description: '',
                priority: TaskPriorities.Later, startDate: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                addedDate: '', order: 0, todoListId: "todolistId1",
                completed: false, deadline: '', description: '',
                priority: TaskPriorities.Later, startDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                addedDate: '', order: 0, todoListId: "todolistId2",
                completed: false, deadline: '', description: '',
                priority: TaskPriorities.Later, startDate: ''
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                addedDate: '', order: 0, todoListId: "todolistId2",
                completed: false, deadline: '', description: '',
                priority: TaskPriorities.Later, startDate: ''
            }
        ]
    },
    app: {status: 'idle', error: null, isInitialized: true},
    auth: {isLoggedIn: true}
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}