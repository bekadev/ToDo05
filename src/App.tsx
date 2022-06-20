import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './componets/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'complited' | 'active';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState <Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'complited'}
    ])

    let removeTodolist = (todolistsId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistsId)
        setTodolists(filteredTodolist)
        delete  tasksObj[todolistsId]
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]:[
            {id: v1(), title: 'Beka', isDone: true},
            {id: v1(), title: 'Ali', isDone: false},
            {id: v1(), title: 'Sem', isDone: true},
            {id: v1(), title: 'Lu', isDone: true}
        ],
        [todolistId2]:[
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Apple', isDone: false},
            {id: v1(), title: 'M1', isDone: true},
            {id: v1(), title: 'oil', isDone: true}
        ]
    })

    function removeTasks(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: true}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)

        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }


    }


    // let task2 = [
    //     {id: 1, title: 'Ayan', isDone: true},
    //     {id: 2, title: 'Katya', isDone: true},
    //     {id: 3, title: 'Aim', isDone: true}
    // ]



    return (
        <div className="App">

            {
                todolists.map((tl) => {
                    let tasksForToDolist = tasksObj[tl.id];
                    if (tl.filter === 'complited') {
                        tasksForToDolist = tasksObj[tl.id].filter(t => t.isDone === true);
                    }

                    if (tl.filter === 'active') {
                        tasksForToDolist = tasksObj[tl.id].filter(t => t.isDone === false);
                    }
                    return (
                        <Todolist
                            removeTodolist={removeTodolist}
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForToDolist}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }


            {/*<Todolist title='Wrap' tasks={task2}/>*/}
        </div>
    );
}

export default App;
