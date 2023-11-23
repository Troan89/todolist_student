import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Components/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ArrRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<ArrRootState, TodolistType[]>( state=>state.todolists )

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }
    function changeTitleTodolist(todolistId: string, newValue: string) {
        dispatch(changeTodolistTitleAC(newValue,todolistId))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value,todolistId))
    }
    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

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
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} >
                    {todolists.map(tl => {
                        return <Grid item>
                            <Paper style={{padding:"10px"}}>
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
            </Container>
        </div>
    );
}

export default AppWithRedux;
