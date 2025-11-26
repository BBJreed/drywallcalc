import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';

import CalculatorScreen from './src/screens/CalculatorScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { COLORS } from './src/constants/colors';
import { initializeAdMob } from './src/utils/admob';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CalculatorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Calculator" 
        component={CalculatorScreen}
        options={{ title: 'Drywall Calculator' }}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ title: 'Material Estimate' }}
      />
    </Stack.Navigator>
  );
}

const TabIcon = ({ name, color, size }) => {
  const icons = {
    calculator: '🧮',
    settings: '⚙️',
  };
  
  return (
    <Text style={{ fontSize: size, color }}>
      {icons[name] || '•'}
    </Text>
  );
};

export default function App() {
  useEffect(() => {
    initializeAdMob();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textSecondary,
            tabBarStyle: {
              backgroundColor: COLORS.surface,
              borderTopColor: COLORS.border,
            },
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="CalculatorTab" 
            component={CalculatorStack}
            options={{
              tabBarLabel: 'Calculate',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="calculator" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="settings" color={color} size={size} />
              ),
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTintColor: COLORS.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}