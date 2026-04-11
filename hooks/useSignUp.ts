import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { auth } from "../app/config/firebase";
import { useNavigation } from "@react-navigation/native";

type AlertType = 'error' | 'success' | 'warning' | 'info';

const getSignUpFirebaseError = (code: string): { title: string, message: string } => {
    switch (code) {
        case 'auth/email-already-in-use':
            return { title: 'Email Already Exists', message: 'An account with this email already exists. Please login instead.' };
        case 'auth/invalid-email':
            return { title: 'Invalid Email', message: 'Please enter a valid email address.' };
        case 'auth/weak-password':
            return { title: 'Weak Password', message: 'Password is too weak. Please use at least 6 characters with a mix of letters and numbers.' };
        case 'auth/operation-not-allowed':
            return { title: 'Not Allowed', message: 'Email/password sign-up is currently disabled. Please contact support.' };
        case 'auth/network-request-failed':
            return { title: 'No Internet', message: 'Please check your internet connection and try again.' };
        case 'auth/too-many-requests':
            return { title: 'Too Many Attempts', message: 'Too many requests. Please wait a moment and try again.' };
        case 'auth/configuration-not-found':
            return { title: 'Configuration Error', message: 'Authentication configuration is missing. Please contact support.' };
        default:
            return { title: 'Registration Failed', message: 'Something went wrong. Please try again later.' };
    }
};


export const useSignUp = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);

    const [alert, setAlert] = useState({
        visible: false,
        type: 'error' as AlertType,
        title: '',
        message: '',
    });

    const toggleSecureText = useCallback(() => setSecureText((prev) => !prev), []);
    const toggleSecureConfirm = useCallback(() => setSecureConfirm((prev) => !prev), []);

    const showAlert = useCallback((type: AlertType, title: string, message: string) => {
        setAlert({ visible: true, type, title, message });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
    }, []);

    const handleSignUp = useCallback(async () => {
        if (!email || !password) {
            showAlert('error', 'Missing Fields', 'Please fill in both email and password to continue.');
            return;
        }
        if (password?.length < 6) {
            showAlert('warning', 'Weak Password', 'Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            showAlert('warning', 'Password Mismatch', 'Passwords do not match. Please re-enter.');
            return;
        }

        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                navigation.replace('Home');
            });


        } catch (error: any) {
            const { title, message } = getSignUpFirebaseError(error.code);
            showAlert('error', title, message);

        } finally {
            setLoading(false);
        }

    }, [email, password, confirmPassword, showAlert]);;

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        setLoading,
        secureText,
        toggleSecureText,
        secureConfirm,
        toggleSecureConfirm,
        handleSignUp,
        alert,
        setAlert,
        hideAlert
    }


}