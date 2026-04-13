import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import SplashScreenView from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={styles.fabButton}
        onPress={onPress}
    >
        <View style={styles.fabCircle}>
            {children}
        </View>
    </TouchableOpacity>
);

// Tab Navigation
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'home' : 'home-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    }
                    if (route.name === 'AddExpense') {
                        return <MaterialCommunityIcons name="plus" size={30} color="white" />;
                    }
                    if (route.name === 'Profile') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'account' : 'account-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    }
                    return null;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{
                    title: 'Add Expense',
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};


const AppNavigator = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isReady, setIsReady] = useState(false);

    const handleSplashFinish = () => {
        setShowSplash(false);
        requestAnimationFrame(() => {
            setIsReady(true);
        });
    }
    if (showSplash) {
        return <SplashScreenView onFinish={() => {
            handleSplashFinish();
        }} />
    }

    if (!isReady) {
        return null;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="MainTabs" component={TabNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

// ============================================================
//  Styles
// ============================================================
const styles = StyleSheet.create({
    fabButton: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderWidth: 4,
        borderColor: 'white',
    },
    tabBar: {
        height: 80,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
        borderTopWidth: 0,
    },
});
