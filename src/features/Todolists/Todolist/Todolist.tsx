import React, {ChangeEvent, useEffect} from "react";
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../../app/store";
import {addTaskTC, fetchTasksTC, removeTasksTC, updateTaskTC} from "../tasks-reducer";
import {Task_T, TaskStatuses} from "../../../api/task-api";
import {FilterValuesType, TodolistDomain_T} from "../todolists-reducer";


type PropsType = {
    todolist: TodolistDomain_T
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newValue: string) => void
    demo?: boolean
}

export const Todolist: React.FC<PropsType> = ({demo = false, ...props}) => {
    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootState, Task_T[]>(state => state.tasks[props.todolist.id])

    // useEffect(()=>{
    //     if (demo) {
    //         return
    //     }
    //     dispatch(fetchTasksTC(props.todolist.id))
    // }, [])

    let tasksForTodolist = tasks
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t => t.status === TaskStatuses.New))
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t => t.status === TaskStatuses.Completed))
    }

    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(value, props.todolist.id)
    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTitleTodolist = (newValue: string) => {
        props.changeTitleTodolist(props.todolist.id, newValue)
    }
    const onChangeStatus = (todolistId:string, tasksId:string, status:TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, {status}, tasksId))
    }
    const onRemoveTask = (taskId:string, todolistId:string) => {
        dispatch(removeTasksTC(todolistId, taskId))
    }
    const onAddTask = (title:string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }
    const onChangeTitleTask = (title:string, taskId:string) => {
        dispatch(updateTaskTC(props.todolist.id, {title}, taskId))
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTitleTodolist}/>
                <IconButton onClick={removeTodolist} aria-label="delete" disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title: string) => onAddTask(title)} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map(t => {
                    const onRemoveHandler = () => onRemoveTask(t.id, props.todolist.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        onChangeStatus(props.todolist.id, t.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
                    }
                    const onChangeTitleHandler = (title: string) => onChangeTitleTask(title, t.id)

                    return <div
                        key={t.id}
                        className={t.status === TaskStatuses.Completed ? "is-Done" : ""}>
                        <Checkbox
                            onChange={onChangeStatusHandler}
                            checked={t.status === TaskStatuses.Completed}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button color={"inherit"} variant={props.todolist.filter === 'all' ? "contained" : 'text'}
                        onClick={() => {
                            onClickFilterHandler("all")
                        }}>ALL
                </Button>
                <Button color={"primary"} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler("active")
                        }}>ACTIVE
                </Button>
                <Button color={"secondary"} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler("completed")
                        }}>COMPLETED
                </Button>
            </div>
        </div>
    )
}

