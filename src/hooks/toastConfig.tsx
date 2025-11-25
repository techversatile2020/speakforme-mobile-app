// toastConfig.tsx

import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { useTheme } from '../theme';

export const toastConfig = {
  success: (props: any) => {
    const { AppTheme } = useTheme();
    return (
      <BaseToast
        {...props}
        style={{
          backgroundColor: AppTheme.background,
          borderLeftColor: 'green',
        }}
      />
    );
  },
  error: (props: any) => {
    const { AppTheme } = useTheme();
    return (
      <ErrorToast
        {...props}
        style={{ backgroundColor: AppTheme.background, borderLeftColor: 'red' }}
      />
    );
  },
  info: (props: any) => {
    const { AppTheme } = useTheme();
    return (
      <InfoToast
        {...props}
        style={{
          backgroundColor: AppTheme.background,
          borderLeftColor: 'blue',
        }}
      />
    );
  },
};
