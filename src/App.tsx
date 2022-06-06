import React, { useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './componets/Todolist';

export type FilterValuesType = 'all' | 'complited' | 'active';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'Beka', isDone: true},
        {id: 2, title: 'Ali', isDone: false},
        {id: 3, title: 'Sem', isDone: true},
        {id: 4, title: 'Lu', isDone: true}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');


    function removeTasks(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForToDolist = tasks;
    if (filter === 'complited') {
        tasksForToDolist = tasks.filter(t => t.isDone === true);
    }

    if (filter === 'active') {
        tasksForToDolist = tasks.filter(t => t.isDone === false);
    }


    // let task2 = [
    //     {id: 1, title: 'Ayan', isDone: true},
    //     {id: 2, title: 'Katya', isDone: true},
    //     {id: 3, title: 'Aim', isDone: true}
    // ]

    return (
        <div className="App">
            <Todolist title='ToDo'
                      tasks={tasksForToDolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
            />
            {/*<Todolist title='Wrap' tasks={task2}/>*/}
        </div>
    );
}

export default App;
