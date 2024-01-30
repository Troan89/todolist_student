import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {Task_T} from "../api/task-api";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "./store";
import {meTC, Status_T} from './app-reducer';
import {BrowserRouter, Navigate, Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logOutTC} from "../features/Login/auth-reducer";

export type TasksStateType = {
    [key: string]: Array<Task_T>
}
type AppProps_T = {
    demo?: boolean
}

function App({demo = false}: AppProps_T) {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top:'30%', textAlign:'center', width: '100%'}}>
            <CircularProgress />
        </div>
    }

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackBar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn ? <Button color="inherit" onClick={logOutHandler}>LogOut</Button> : null}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>

                </Container>
            </div>
        </BrowserRouter>

    );
}

export default App;
