import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.initialized}
        default:
            return state
    }
}

export type AppSetError_T = ReturnType<typeof appSetErrorAC>;
export type AppSetStatus_T = ReturnType<typeof appSetStatusAC>;
export type SetInitialized_T = ReturnType<typeof setInitializedAC>;
type ActionsType =
    | AppSetError_T
    | AppSetStatus_T
    | SetInitialized_T
    | ReturnType<typeof setIsLoggedInAC>
export type InitialStateType = {
    status: Status_T,
    error: string | null,
    isInitialized: boolean
}
export type Status_T = 'idle' | 'loading' | 'succeeded' | 'failed'
type ThunkDispatch = Dispatch<ActionsType | AppSetStatus_T | AppSetError_T>

//action
export const appSetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const appSetStatusAC = (status: Status_T) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)

//thunk
export const meTC = () => (dispatch: ThunkDispatch) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {

                dispatch(setIsLoggedInAC(true))
            }
        })
        .finally(()=>{
            dispatch(setInitializedAC(true))
        })
}