import { createSlice } from "@reduxjs/toolkit"

export interface Task {
    id?: number;
    title: string;
    description?: string;
    created: string;
    important: boolean;
    completed: boolean;
}

const ID_MAX_NUMBER = Number.MAX_VALUE

const defaultTasks: Task[] = [
    {
        id: 1,
        title: 'First task',
        description: 'Description One',
        created: '2023-09-17',
        important: true,
        completed: true,
    },
    {
        id: 2,
        title: 'Second task',
        description: 'Description Two',
        created: '2023-10-10',
        important: false,
        completed: false,
    },
    {
        id: 3,
        title: 'Important task',
        description: 'Description Three',
        created: '2023-10-10',
        important: true,
        completed: true,
    },
    {
        id: 4,
        title: 'Need haircut',
        description: 'Description four',
        created: '2023-09-17',
        important: false,
        completed: false,
    },
    {
        id: 5,
        title: 'Go movie',
        description: 'Description five',
        created: '2023-10-10',
        important: true,
        completed: false,
    },
    {
        id: 6,
        title: 'Must prepare dinner',
        description: 'Description six',
        created: '2023-10-10',
        important: false,
        completed: true,
    },
]

const initialState = { tasks: defaultTasks };

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        AddTaskReducer: (state, action) => {
            const length = state.tasks.length - 1
            const lastId = state.tasks[length].id
            const newTask = { ...action.payload, id: lastId ? lastId + 1 : ID_MAX_NUMBER }

            state.tasks.push(newTask)
        },
        editTaskReducer: (state, action) => {
            const id = action.payload.id;
            const task = state.tasks.find(task => task.id === id)!
            const index = state.tasks.indexOf(task);

            state.tasks[index] = action.payload
        },
        deleteTaskReducer: (state, action) => {
            const id = action.payload;
            const tasks = state.tasks.filter(task => task.id !== id)
            state.tasks = tasks;
        },
        searchTaskReducer: (state, action) => {
            const str = action.payload
            // This is a hack to use until the actual task storage logic is implemented
            if (!str.length) {
                state.tasks = defaultTasks
                return;
            }

            const tasks = state.tasks.filter((task: Task) =>
                task.title.toLowerCase().includes(str.toLowerCase()))
            state.tasks = [...tasks]
        },
        toggleCompletedTaskReducer: (state, action) => {
            const id = action.payload;
            const task = state.tasks.find(task => task.id === id)
            if (task) {
                task.completed = !task.completed
            }
        },
        toogleImportantTaskReducer: (state, action) => {
            const id = action.payload;
            const task = state.tasks.find(task => task.id === id)
            if (task) {
                task.important = !task.important
            }
        }
    },
    extraReducers: {}
})

export default tasksSlice.reducer

export const { AddTaskReducer,
    editTaskReducer,
    searchTaskReducer,
    toggleCompletedTaskReducer,
    toogleImportantTaskReducer,
    deleteTaskReducer } = tasksSlice.actions;


export const getTasks = (state: any) => state.tasks.tasks

export const getCompletedTasks = (state: any) => state.tasks.tasks.filter((task: Task) => task.completed)

export const getUncompletedTasks = (state: any) => state.tasks.tasks.filter((task: Task) => !task.completed)

export const getImportantTasks = (state: any) => state.tasks.tasks.filter((task: Task) => task.important)

export const getTodayTasks = (state: any) => {
    const todayDate = new Date()
    const day = todayDate.getDate().toString().padStart(2, '0')
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0')
    const year = todayDate.getFullYear()

    const todayToStr: string = `${year}-${month}-${day}`

    return state.tasks.tasks.filter((task: Task) => task.created === todayToStr)
}
