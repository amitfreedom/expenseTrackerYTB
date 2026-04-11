import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={styles.title}>HomeScreen</Text>

            <Pressable style={styles.button} onPress={() => {
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Logout', style: 'destructive', onPress: async () => {
                            await firebaseSignOut(auth);
                            navigation.replace('Login');
                        }
                    }
                ]);
            }}>
                <Text>Logout</Text>
            </Pressable>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f44336',
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})