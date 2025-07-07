import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import Inventory from '../screens/tab/Inventory';
import Game from '../screens/tab/Game';
import Shop from '../screens/tab/Shop';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Game"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.bgIcon, focused && { paddingTop: 20 }]}>
              <Image
                source={require('../assets/icons/tabBg.png')}
                style={[styles.tabBg, focused && { width: 66, height: 66 }]}
              />
              <Image
                source={require('../assets/icons/inventory.png')}
                style={focused && { width: 26, height: 26 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.bgIcon, focused && { paddingTop: 20 }]}>
              <Image
                source={require('../assets/icons/tabBg.png')}
                style={[styles.tabBg, focused && { width: 66, height: 66 }]}
              />
              <Image
                source={require('../assets/icons/game.png')}
                style={focused && { width: 26, height: 26 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.bgIcon, focused && { paddingTop: 20 }]}>
              <Image
                source={require('../assets/icons/tabBg.png')}
                style={[styles.tabBg, focused && { width: 66, height: 66 }]}
              />
              <Image
                source={require('../assets/icons/shop.png')}
                style={focused && { width: 26, height: 26 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    paddingTop: 16,
    borderTopWidth: 0,
    justifyContent: 'center',
    bottom: 59,
    marginHorizontal: 24,
    borderRadius: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  bgIcon: {
    paddingTop: 16,
    paddingBottom: 14,
    alignItems: 'center',
  },
  tabBg: {
    position: 'absolute',
  },
});

export default TabNav;
