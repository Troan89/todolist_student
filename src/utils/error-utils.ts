import React from "react";
import {AppSetError_T, appSetErrorAC, AppSetStatus_T, appSetStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/task-api";
import {Dispatch} from "redux";

export function handleServerAppError<D>(data: ResponseType<D>, dispatch: Dispatch<AppSetError_T | AppSetStatus_T>) {
    dispatch(appSetErrorAC({error: data.messages[0]}))
    dispatch(appSetStatusAC({status :"failed"}))
}

export function handleServerNetworkError(error: { message: string }, dispatch: Dispatch<AppSetError_T | AppSetStatus_T>) {
    dispatch(appSetErrorAC(error.message ? {error: error.message} : {error: "Some error"}))
    dispatch(appSetStatusAC({status : "failed"}))
}