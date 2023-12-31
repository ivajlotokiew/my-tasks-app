import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDirectoryToServer, deleteAllDirectoriesToServer, deleteDirectoryToServer, editDirectoryToServer, getAllDirectoriesFromServer } from "../../services/directoriesService";

export interface Directory {
    id?: number;
    title: string;
}

interface iInitialStateDirectories {
    directories: Directory[],
    isLoading: boolean,
    error: string | null,
}

const initialState: iInitialStateDirectories = {
    directories: [],
    isLoading: false,
    error: null,
};

export const fetchDirectories: any = createAsyncThunk('directories/getDirectories',
    async (params: {}, { rejectWithValue }) => {
        try {
            const { data } = await getAllDirectoriesFromServer(params)
            return data
        } catch (error) {
            return rejectWithValue("Failed to load directories. Try again soon.");
        }
    });

export const addDirectoryAction: any = createAsyncThunk('directories/addDirectories',
    async (params: {}, { rejectWithValue }) => {
        try {
            const { data } = await addDirectoryToServer(params)
            return data;
        } catch (error) {
            return rejectWithValue("We couldn't add a new directory. Try again soon.");
        }
    });

export const editDirectoryAction: any = createAsyncThunk('directories/editDirectories',
    async (params: Directory, { rejectWithValue }) => {
        try {
            const { data } = await editDirectoryToServer(params)
            return data;
        } catch (error) {
            return rejectWithValue("We couldn't edit the directory. Try again soon.");
        }
    });

export const deleteDirectoryAction: any = createAsyncThunk('directories/deleteDirectory',
    async (params: Directory, { rejectWithValue }) => {
        try {
            const { data } = await deleteDirectoryToServer(params)
            return data
        } catch (error) {
            return rejectWithValue("We couldn't delete the directory. Try again soon.");
        }
    });

export const deleteAllDirectoriesAction: any = createAsyncThunk('directories/deleteAllDirectories',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await deleteAllDirectoriesToServer()
            return data
        } catch (error) {
            return rejectWithValue("We couldn't delete the all directories. Try again soon.");
        }
    });

export const directoriesSlice = createSlice({
    name: 'directories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDirectories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDirectories.fulfilled, (state, { payload }) => {
                state.directories = payload.directories;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchDirectories.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
            .addCase(addDirectoryAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addDirectoryAction.fulfilled, (state, { payload }) => {
                const newDirectory = payload.directory;
                state.directories.push(newDirectory)
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addDirectoryAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
            .addCase(editDirectoryAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editDirectoryAction.fulfilled, (state, { payload }) => {
                const id = payload.directory.id;
                const Directory = state.directories.find(Directory => Directory.id === id)!
                const index = state.directories.indexOf(Directory);
                state.directories[index] = payload.directory
                state.isLoading = false;
                state.error = null;
            })
            .addCase(editDirectoryAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
            .addCase(deleteDirectoryAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDirectoryAction.fulfilled, (state, { payload }) => {
                state.directories = payload.directories
                state.isLoading = false
                state.error = null
            })
            .addCase(deleteDirectoryAction.rejected, (state, { payload }) => {
                state.error = payload
                state.isLoading = false;
            })
            .addCase(deleteAllDirectoriesAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAllDirectoriesAction.fulfilled, (state, { payload }) => {
                state.directories = payload.directories
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteAllDirectoriesAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
    },
})

export default directoriesSlice.reducer

export const showDirectories = (state: any) => state.directories.directories

export const getError = (state: any) => state.directories.error

export const isLoading = (state: any) => state.directories.isLoading
