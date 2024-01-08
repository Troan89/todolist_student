import {Provider} from "react-redux";

import React from 'react'
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {todolistsReducer} from "./todolists-reducer";
import {ArrRootState} from "./store";
import {TaskPriorities, TaskStatuses} from "../api/task-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const initialGlobalState = {
    todolists: [
        {
            id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0,
        },
        {
            id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0,
        }
    ] ,
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
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as ArrRootState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}