import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from "../Components/Todolist";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomain_T,
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ArrRootState} from "../state/store";
import {Task_T} from "../api/task-api";

export type TasksStateType = {
    [key: string]: Array<Task_T>
}

function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}

type TodolistsList_T = {

}

const TodolistsList = ({}: TodolistsList_T) => {
    const dispatch = useDispatch()
    const todolists = useSelector<ArrRootState, TodolistDomain_T[]>(state => state.todolists)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodolistsTC())
    }, [])

    function removeTodolist(todolistId: string) {
        // @ts-ignore
        dispatch(removeTodolistTC(todolistId))
    }

    function changeTitleTodolist(todolistId: string, newValue: string) {
        // @ts-ignore
        dispatch(changeTodolistTitleTC(todolistId, newValue))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    function addTodolist(title: string) {
        // @ts-ignore
        dispatch(addTodolistTC(title))
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
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            changeFilter={changeFilter}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTitleTodolist={changeTitleTodolist}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
}

export default App;
