import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: initialState_T = {
    status: 'idle',
    error: null,
    isInitialized: false
}
type initialState_T = {
    status: Status_T
    error: string | null
    isInitialized: boolean
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        appSetErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        appSetStatusAC(state, action: PayloadAction<{ status: Status_T }>) {
            state.status = action.payload.status
        },
        setInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
            state.isInitialized = action.payload.initialized
        }
    }
})

export const appReducer = slice.reducer

export const {appSetErrorAC, appSetStatusAC, setInitializedAC} = slice.actions

export type Status_T = 'idle' | 'loading' | 'succeeded' | 'failed'

//thunk
export const meTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
            }
        })
        .finally(() => {
            dispatch(setInitializedAC({initialized: true}))
        })
}

export type AppSetError_T = ReturnType<typeof appSetErrorAC>
export type AppSetStatus_T = ReturnType<typeof appSetStatusAC>