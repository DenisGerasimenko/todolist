import React, {useDebugValue, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists =useSelector<AppRootStateType,Array<TodolistType>>(state=>state.todolists)
    const tasksObj = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)
    const dispatch =useDispatch();



    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatch(action)
        /*let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});*/
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
        /*let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }*/
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId)
        dispatch(action)
        /* let task = {id: v1(), title: title, isDone: false};
         let tasks = tasksObj[todolistId];
         let newTasks = [task, ...tasks];
         tasksObj[todolistId] = newTasks;
         setTasks({...tasksObj});*/
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
        /*let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }*/
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))

        /* let tasks = tasksObj[todolistId];
         let task = tasks.find(t => t.id === taskId);
         if (task) {
             task.title = newTitle;
             setTasks({...tasksObj})
         }*/
    }

  /*  let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: "active"},
        {id: todolistId2, title: 'What to buy', filter: "completed"},
    ]);*/

    let removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)


        /*let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});*/
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
        /*  const todolist = todolists.find(tl => tl.id === todolistId);
          if (todolist) {
              todolist.title = newTitle;
              setTodolists([...todolists])
          }*/
    }
/*

    let [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}
        ]
    });
*/

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)

        /* let newTodolistId = v1();
         let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
         setTodolists([newTodolist, ...todolists]);
         setTasks({
             ...tasksObj,
             [newTodolistId]: []
         })*/
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];


                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }


                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>)
}

export default AppWithRedux;