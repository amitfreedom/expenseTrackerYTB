import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const toggleSecureText = useCallback(() => {
        setSecureText((prev) => !prev);
    }, []);

    const handleLogin = useCallback(async () => {
        console.log(email, password);

        Alert.alert("Login Attempt", `Email: ${email}\nPassword: ${password}`);

    }, [])

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
    };
}