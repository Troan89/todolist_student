import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomain_T
} from "./todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type TodolistsList_T = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsList_T> = ({demo = false}) => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootState, TodolistDomain_T[]>(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistTC(todolistId))
    }

    function changeTitleTodolist(todolistId: string, newValue: string) {
        dispatch(changeTodolistTitleTC(todolistId, newValue))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(ChangeTodolistFilterAC(value, todolistId))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistTC(title))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }


    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                return <Grid item>
                    <Paper style={{padding: "10px"}}>
                        <Todolist
                            todolist={tl}
                            key={tl.id}
                            changeFilter={changeFilter}
                            removeTodolist={removeTodolist}
                            changeTitleTodolist={changeTitleTodolist}
                            demo={demo}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
}