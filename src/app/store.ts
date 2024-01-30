import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/Todolists/todolists-reducer";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector


// @ts-ignore
window.store = store