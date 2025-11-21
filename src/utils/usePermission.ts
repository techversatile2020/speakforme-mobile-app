import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

export const usePermission = (permission: Permission) => {
  const [status, setStatus] = useState<any | null>(null);

  const checkPermission = useCallback(async () => {
    try {
      const result = await check(permission);
      setStatus(result);
      return result;
    } catch (error) {
      console.error('Permission check error:', error);
      return null;
    }
  }, [permission]);

  const requestPermission = useCallback(async () => {
    try {
      const result = await request(permission);
      setStatus(result);
      return result;
    } catch (error) {
      console.error('Permission request error:', error);
      return null;
    }
  }, [permission]);

  return {
    status,
    checkPermission,
    requestPermission,
    isGranted: status === RESULTS.GRANTED,
    isDenied: status === RESULTS.DENIED,
    isBlocked: status === RESULTS.BLOCKED,
  };
};
