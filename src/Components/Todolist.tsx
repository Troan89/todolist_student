import {ChangeEvent, useEffect} from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {ArrRootState} from "../state/store";
import {addTaskTC, fetchTasksTC, removeTasksTC, updateTaskTC} from "../state/tasks-reducer";
import {Task_T, TaskStatuses} from "../api/task-api";
import {FilterValuesType} from "../state/todolists-reducer";


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
    const tasks = useSelector<ArrRootState, Task_T[]>(state => state.tasks[props.id])

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchTasksTC(props.id))
    }, [])

    let tasksForTodolist = tasks
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t => t.status === TaskStatuses.New))
    }
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t => t.status === TaskStatuses.Completed))
    }

    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(value, props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTitleTodolist = (newValue: string) => {
        props.changeTitleTodolist(props.id, newValue)
    }
    const onChangeStatus = (todolistId:string, tasksId:string, status:TaskStatuses) => {
        // @ts-ignore
        dispatch(updateTaskTC(todolistId, {status}, tasksId))
    }
    const onRemoveTask = (taskId:string, todolistId:string) => {
        // @ts-ignore
        dispatch(removeTasksTC(todolistId, taskId))
    }
    const onAddTask = (title:string) => {
        // @ts-ignore
        dispatch(addTaskTC(props.id, title))
    }
    const onChangeTitleTask = (title:string, taskId:string) => {
        // @ts-ignore
        dispatch(updateTaskTC(props.id, {title}, taskId))
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTitleTodolist}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title: string) => onAddTask(title)}/>
            <div>
                {tasksForTodolist.map(t => {
                    const onRemoveHandler = () => onRemoveTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        onChangeStatus(props.id, t.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
                    }
                    // @ts-ignore
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

