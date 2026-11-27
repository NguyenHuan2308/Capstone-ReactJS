import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("userLogin")) || null;

const userSlice = createSlice({
    name: "user",
    initialState: {
        userLogin: savedUser, // { email, accessToken }
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.userLogin = action.payload;
            localStorage.setItem("userLogin", JSON.stringify(action.payload));
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        logout: (state) => {
            state.userLogin = null;
            localStorage.removeItem("userLogin");
            localStorage.removeItem("accessToken");
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;