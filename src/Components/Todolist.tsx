
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {ArrRootState} from "../state/store";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import { FilterValuesType } from "../AppWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newValue: string) => void
}

export const Todolist = (props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<ArrRootState, TaskType[]>(state => state.tasks[props.id])

    let tasksForTodolist = tasks
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t => t.isDone))
    }
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t => !t.isDone))
    }

    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(value, props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTitleTodolist = (newValue: string) => {
        props.changeTitleTodolist(props.id, newValue)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTitleTodolist}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title: string)=>{dispatch(addTaskAC(props.id, title))}}/>
            <div>
                {tasksForTodolist.map(t => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeStatusAC(props.id, t.id, e.currentTarget.checked))
                    const onChangeTitleHandler = (newValue: string) => dispatch(changeTaskTitleAC(props.id, t.id, newValue))

                    return <div
                        key={t.id}
                        className={t.isDone ? "is-Done" : ""}>
                        <Checkbox
                            onChange={onChangeStatusHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button color={"inherit"} variant={props.filter === 'all' ? "contained" : 'text'}
                        onClick={() => {
                            onClickFilterHandler("all")
                        }}>ALL
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler("active")
                        }}>ACTIVE
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => {
                            onClickFilterHandler("completed")
                        }}>COMPLETED
                </Button>
            </div>
        </div>
    )
}

