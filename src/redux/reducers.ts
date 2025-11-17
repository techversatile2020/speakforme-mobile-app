import { combineReducers } from '@reduxjs/toolkit';
import { onboardingReducer } from './onBoardingSlices';
export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
});

export {};
