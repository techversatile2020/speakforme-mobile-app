import { NavigationContainer } from '@react-navigation/native';
import { AppStack, navigationServices, persistor, store } from './src';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer
              ref={(ref: any) => navigationServices.setTopLevelNavigator(ref)}
            >
              <AppStack />
            </NavigationContainer>
          </QueryClientProvider>
        </KeyboardProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
