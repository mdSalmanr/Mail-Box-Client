 // This is a simplified example of how your Store.js might look
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Check for stored auth data in localStorage
const storedToken = localStorage.getItem('token');
const storedEmail = localStorage.getItem('email');
const storedUserId = localStorage.getItem('userId');

// Create auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: storedToken || '',
    email: storedEmail || '',
    userId: storedUserId || '',
    isLoggedIn: !!storedToken
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = '';
      state.email = '';
      state.userId = '';
      state.isLoggedIn = false;
      
      // Also clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
    }
  }
});

// Export auth actions
export const authActions = authSlice.actions;

// Create the store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // Add other reducers here if needed
  }
});

export default store;