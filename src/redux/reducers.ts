import { combineReducers } from '@reduxjs/toolkit';
import { onboardingReducer } from './onBoardingSlices';
import { authReducers } from './authSlices';
export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  auth: authReducers,
});

export {};
