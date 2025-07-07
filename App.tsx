import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/nav/StackNavigation';
import { ContextProvider } from './src/store/context';
import { useEffect, useState } from 'react';

import Loader from './src/components/Loader';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {loader ? <StackNavigation /> : <Loader />}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
