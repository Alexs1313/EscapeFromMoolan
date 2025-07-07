import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav';
import Onboard from '../screens/stack/Onboard';
import Gameplay from '../screens/stack/Gameplay';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Gameplay" component={Gameplay} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
