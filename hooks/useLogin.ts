import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
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
        } else {
            // Proceed with login logic
            showAlert('Login Successful', 'You have logged in successfully!');
        }

    }, [email, password, showAlert]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        setLoading,
        secureText,
        setSecureText,
        toggleSecureText,
        handleLogin,
        alert,
        setAlert,
        hideAlert,
    };
}