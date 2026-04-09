import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import SplashScreenView from '../screens/SplashScreen';

const Stack = createStackNavigator();

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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})