import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import { FilterValuesType } from "../App"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('');
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }

    }



    const onAllClickHandler =  () => props.changeFilter('all')
    const onActiveClickHandler =  () => props.changeFilter('active')
    const onComplitedClickHandler =  () => props.changeFilter('complited')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTasks(t.id)
                        }
                        const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked);
                        }

                        // @ts-ignore
                        return <li className={t.isDone ? 'is-done' : ''} key={t.id}><input onChange={onInputChangeHandler} type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'complited' ? 'active-filter' : ''} onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}