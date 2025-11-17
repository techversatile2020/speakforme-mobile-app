import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type onBoardingStateType = {
  onBoardingCompleted: boolean;
};

export const initialState: onBoardingStateType = {
  onBoardingCompleted: false,
};

const onBoardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnBoardingCompleted: (state, action) => {
      state.onBoardingCompleted = action.payload;
    },
  },
});

export const { setOnBoardingCompleted } = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
