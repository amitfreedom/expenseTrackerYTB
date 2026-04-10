import { useCallback, useState } from "react";
import { Alert } from "react-native";

type AlertType = 'error' | 'success' | 'warning' | 'info';

export const useSignUp = () => {
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

    const handleSignUp = useCallback(() => {
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
        else {
            // Proceed with sign-up logic
            showAlert('success', 'Account Created', 'Your account has been created successfully!');
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