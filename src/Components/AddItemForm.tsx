import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (taskValue: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [taskValue, setTaskValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskCallBack()
        }
    }
    const addTaskCallBack = () => {
        if (taskValue.trim() === '') {
            setError("Field is required")
            return
        }
        props.addItem(taskValue.trim())
        setTaskValue('')
    }

    return <div>
        <TextField
            variant={"standard"}
            label="Type value"
            error={!!error}
            value={taskValue}
            helperText={error}
            onChange={onChangeInput}
            onKeyPress={onKeyPressHandler}/>
        <IconButton onClick={addTaskCallBack} color={"secondary"}>
            <ControlPoint />
        </IconButton>
    </div>
}