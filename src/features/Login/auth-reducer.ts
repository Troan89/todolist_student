import {TasksStateType} from "../../app/App"
import {Dispatch} from "redux";
import {AppSetError_T, AppSetStatus_T, appSetStatusAC} from "../../app/app-reducer";
import {authApi, LoginParams_T} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ClearTodolistsDataAC, ClearTodolistsDataType} from "../Todolists/todolists-reducer";

const initialState: InitialStateAuthReducer_T = {
    isLoggedIn: false
}

//reducer
export const authReducer = (state: InitialStateAuthReducer_T = initialState, action: ActionsType): InitialStateAuthReducer_T => {
    switch (action.type) {
        case "LOGIN/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// action
export const setIsLoggedInAC = (isLoggedIn:boolean) => ({type: 'LOGIN/SET_IS_LOGGED_IN', isLoggedIn} as const)

//thunks
export const loginTC = (data:LoginParams_T) => (dispatch: ThunkDispatch) => {
    dispatch(appSetStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(appSetStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = () => (dispatch: ThunkDispatch) => {
    dispatch(appSetStatusAC("loading"))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(appSetStatusAC("succeeded"))
                dispatch(ClearTodolistsDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


//types
type InitialStateAuthReducer_T = {
    isLoggedIn:boolean
}
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>

type ThunkDispatch = Dispatch<ActionsType | AppSetStatus_T | AppSetError_T | ClearTodolistsDataType>
