// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// 创建一个简单的 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store;
