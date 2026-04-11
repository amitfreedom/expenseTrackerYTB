import { useState, useCallback } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../app/config/firebase';
import { useNavigation } from '@react-navigation/native';

export const getFirebaseErrorMessage = (errorCode: string): { title: string; message: string } => {
    switch (errorCode) {
        case 'auth/invalid-credential':
            return { title: 'Invalid Credentials', message: 'The email or password you entered is incorrect. Please check and try again.' };
        case 'auth/invalid-email':
            return { title: 'Invalid Email', message: 'Please enter a valid email address.' };
        case 'auth/user-not-found':
            return { title: 'User Not Found', message: 'No account found with this email. Please sign up first.' };
        case 'auth/wrong-password':
            return { title: 'Wrong Password', message: 'The password you entered is incorrect. Please try again.' };
        case 'auth/user-disabled':
            return { title: 'Account Disabled', message: 'This account has been disabled. Please contact support.' };
        case 'auth/too-many-requests':
            return { title: 'Too Many Attempts', message: 'Too many failed login attempts. Please try again later or reset your password.' };
        case 'auth/network-request-failed':
            return { title: 'No Internet', message: 'Please check your internet connection and try again.' };
        default:
            return { title: 'Login Failed', message: 'Something went wrong. Please try again later.' };
    }
};

export const useLogin = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const [alert, setAlert] = useState({
        visible: false,
        title: '',
        message: '',
    });

    const showAlert = useCallback((title: string, message: string) => {
        setAlert({ visible: true, title, message });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
    }, []);

    const toggleSecureText = useCallback(() => {
        setSecureText((prev) => !prev);
    }, []);

    const handleLogin = useCallback(async () => {
        if (!email || !password) {
            showAlert('Missing Fields', 'Please fill in both email and password to continue.');
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user.email);
                navigation.replace('Home');
            });
        } catch (e: any) {
            console.error(e);
            const { title, message } = getFirebaseErrorMessage(e.code);
            showAlert(title, message);
        } finally {
            setLoading(false);
        }
    }, [email, password, showAlert]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        secureText,
        toggleSecureText,
        alert,
        hideAlert,
        handleLogin,
    };
};
