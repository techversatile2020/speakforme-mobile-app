import { NavigationContainer } from '@react-navigation/native';
import { AppStack, navigationServices, persistor, store } from './src';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KeyboardProvider>
          <NavigationContainer
            ref={(ref: any) => navigationServices.setTopLevelNavigator(ref)}
          >
            <AppStack />
          </NavigationContainer>
        </KeyboardProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
