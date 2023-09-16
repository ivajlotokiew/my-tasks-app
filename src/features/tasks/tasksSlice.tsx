import { createSlice } from "@reduxjs/toolkit"

export interface Task {
    id: number;
    title: string;
    description?: string;
    created: string;
    important: boolean;
    completed: boolean;
}

const defaultTasks: Task[] = [
    {
        id: 1,
        title: 'Task1',
        description: 'Description One',
        created: '2023-10-10',
        important: false,
        completed: true,
    },
    {
        id: 2,
        title: 'Task2',
        description: 'Description Two',
        created: '2023-10-10',
        important: false,
        completed: false,
    },
    {
        id: 3,
        title: 'Task3',
        description: 'Description Three',
        created: '2023-10-10',
        important: false,
        completed: true,
    },
    {
        id: 4,
        title: 'Task4',
        description: 'Description four',
        created: '2023-10-10',
        important: false,
        completed: false,
    },
]

const initialState = { tasks: defaultTasks };

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toogleTaskCompleted: (state, action) => {
            const id = action.payload;
            const task = state.tasks.find(task => task.id === id)
            if (task) {
                task.completed = !task.completed
            }
        }
    },
    extraReducers: {}
})

export default tasksSlice.reducer

export const { toogleTaskCompleted } = tasksSlice.actions;


export const getTasks = (state: any) => state.tasks.tasks

export const getCompletedTasks = (state: any) => state.tasks.tasks.filter((task: Task) => task.completed)

export const getUncompletedTasks = (state: any) => state.tasks.tasks.filter((task: Task) => !task.completed)

// export const { increaseReactionsCount } = postsSlice.actions;


// export const getPostById = (id: number) => (state: postState) => state.posts.posts?.find((post: Post) => post.id === id)

// export const isLoadingPosts = (state: postState) => state.posts.isLoading;

// export const selectPostsError = (state: postState) => state.posts.error;
