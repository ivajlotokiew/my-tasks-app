import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import request from "axios";
import { editUserToServer, loginUserFromServer, signupUserToServer } from "../../services/authenticationService";

export interface User {
    id: number,
    name: string,
    imgURL: string,
}

interface iInitialState {
    authToken: string | null,
    authUser: User
    authStatus: string,
    authError: string | null,
    editProfileStatus: string,
}

let user;
if (localStorage.getItem("authUser") !== null) {
    user = localStorage.getItem("authUser")
}

const initialState: iInitialState = {
    authToken: localStorage.getItem("authToken") ?? "",
    authUser: user ? JSON.parse(user) : {} as User,
    authStatus: "idle",
    editProfileStatus: "idle",
    authError: null,
};

export const loginUser: any = createAsyncThunk(
    "authenticate/loginUser",
    async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const loginResponse = await loginUserFromServer({ username, password })
            return loginResponse.data;
        } catch (error) {
            if (request.isAxiosError(error) && error.response) {
                console.error(error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const signupUser = createAsyncThunk(
    "authenticate/signupUser",
    async (userDetails: {}, { rejectWithValue }) => {
        try {
            const signupResponse = await signupUserToServer(userDetails)
            return signupResponse.data;
        } catch (error) {
            if (request.isAxiosError(error) && error.response) {
                console.error(error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const editUserProfile = createAsyncThunk(
    "authenticate/editUserProfile",
    async ({ userDetails, authToken }: { userDetails: {}, authToken: string }, { rejectWithValue }) => {
        try {
            const resp = await editUserToServer({ userDetails, authToken })
            return resp.data.user;
        } catch (error) {
            if (request.isAxiosError(error) && error.response) {
                console.error(error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    }
);

const authenticationSlice = createSlice({
    name: "authenticastion",
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
            state.authToken = null;
            state.authStatus = "idle";
            state.authError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.authStatus = "pending";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authStatus = "fulfilled";
                state.authToken = action.payload.encodedToken;
                state.authUser = action.payload.foundUser;
                localStorage.setItem("authToken", state.authToken || '');
                localStorage.setItem("authUser", JSON.stringify(state.authUser));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authStatus = "Error";
            })
            .addCase(signupUser.pending, (state) => {
                state.authStatus = "pending";
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.authStatus = "fulfilled";
                state.authToken = action.payload.encodedToken;
                localStorage.setItem("authToken", state.authToken || '');
            })
            .addCase(editUserProfile.pending, (state, action) => {
                state.editProfileStatus = "pending";
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.authToken = action.payload;
            })
            .addCase(editUserProfile.rejected, (state, action: any) => {
                state.authError = action.payload;
            })
    }

});

export default authenticationSlice.reducer;

export const showUser = (state: any) => state.authenticastion.authUser;

export const { logoutUser } = authenticationSlice.actions;
