import {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField variant={"standard"} onBlur={activeViewMode} value={title} autoFocus onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
}