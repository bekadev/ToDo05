import React, { useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './componets/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'complited' | 'active';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'Beka', isDone: true},
        {id: v1(), title: 'Ali', isDone: false},
        {id: v1(), title: 'Sem', isDone: true},
        {id: v1(), title: 'Lu', isDone: true}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');


    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: true};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find( t => t.id === taskId);

        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks])
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
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
            {/*<Todolist title='Wrap' tasks={task2}/>*/}
        </div>
    );
}

export default App;
