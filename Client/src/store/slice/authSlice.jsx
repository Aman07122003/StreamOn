import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api';

// Define initial state
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('accesstoken') || false,
    accessToken: localStorage.getItem('accesstoken') || null,
    refreshToken: localStorage.getItem('refreshtoken') || null,
    loading: false,
    error: null,
    status: false, 
    }                                                      

    export const register = createAsyncThunk('/users/register', async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

    export const login = createAsyncThunk('/users/login', async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/login', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

    export const logout = createAsyncThunk('/users/logout', async (_, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/logout');
            return true;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder 
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                const { user, accessToken, refreshToken } = action.payload.data;
                state.loading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accesstoken', accessToken);
                localStorage.setItem('refreshtoken', refreshToken);
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Registration failed';
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                const { user, accessToken, refreshToken } = action.payload.data;
                state.loading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accesstoken', accessToken);
                localStorage.setItem('refreshtoken', refreshToken);
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Login failed';
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.status = false;
                state.error = null;
            })

            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;

                localStorage.removeItem('user');
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshtoken');
            })

            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Logout failed';
            });
        }
    }); 

export default authSlice.reducer;