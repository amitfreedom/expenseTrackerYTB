import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

type AlertType = 'error' | 'success' | 'warning' | 'info';

interface CustomAlertDialogProps {
    visible: boolean;
    type?: AlertType;
    title?: string;
    message: string;
    buttonText?: string;
    onClose: () => void;
}

const alertConfig: Record<AlertType, {
    icon: string;
    color: string;
    bgGradient: string;
    lightBg: string;
}> = {
    error: {
        icon: 'alert-circle',
        color: '#E53935',
        bgGradient: '#FFEBEE',
        lightBg: '#FFF5F5',
    },
    success: {
        icon: 'check-circle',
        color: '#2E7D32',
        bgGradient: '#E8F5E9',
        lightBg: '#F1F8E9',
    },
    warning: {
        icon: 'alert',
        color: '#F57C00',
        bgGradient: '#FFF3E0',
        lightBg: '#FFFDE7',
    },
    info: {
        icon: 'information',
        color: '#1565C0',
        bgGradient: '#E3F2FD',
        lightBg: '#E8EAF6',
    },
};

export const CustomAlertDialog = ({
    visible,
    type = 'error',
    title,
    message,
    buttonText = 'OK',
    onClose,
}: CustomAlertDialogProps) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const iconBounce = useRef(new Animated.Value(0)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    const config = alertConfig[type];

    const defaultTitle =
        type === 'error'
            ? 'Oops!'
            : type === 'success'
                ? 'Success!'
                : type === 'warning'
                    ? 'Warning'
                    : 'Info';

    useEffect(() => {
        if (visible) {
            // Reset animations
            scaleAnim.setValue(0.6);
            opacityAnim.setValue(0);
            iconBounce.setValue(0.3);
            shakeAnim.setValue(0);

            // Entrance animation
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    tension: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Icon bounce
                Animated.spring(iconBounce, {
                    toValue: 1,
                    friction: 3,
                    tension: 100,
                    useNativeDriver: true,
                }).start();

                // Shake for error type
                if (type === 'error') {
                    Animated.sequence([
                        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
                        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
                        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
                        Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
                        Animated.timing(shakeAnim, { toValue: 3, duration: 40, useNativeDriver: true }),
                        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
                    ]).start();
                }
            });
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.6,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.dialogContainer,
                                {
                                    transform: [
                                        { scale: scaleAnim },
                                        { translateX: shakeAnim },
                                    ],
                                },
                            ]}
                        >
                            {/* Top accent bar */}
                            <View style={[styles.accentBar, { backgroundColor: config.color }]} />

                            {/* Icon circle */}
                            <Animated.View
                                style={[
                                    styles.iconCircle,
                                    {
                                        backgroundColor: config.bgGradient,
                                        borderColor: config.color,
                                        transform: [{ scale: iconBounce }],
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name={config.icon as any}
                                    size={36}
                                    color={config.color}
                                />
                            </Animated.View>

                            {/* Content */}
                            <View style={styles.content}>
                                <Text style={[styles.title, { color: config.color }]}>
                                    {title || defaultTitle}
                                </Text>
                                <Text style={styles.message}>{message}</Text>
                            </View>

                            {/* Button */}
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: config.color }]}
                                onPress={handleClose}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>{buttonText}</Text>
                            </TouchableOpacity>

                            {/* Decorative subtle circles */}
                            <View
                                style={[
                                    styles.decorCircle1,
                                    { backgroundColor: config.bgGradient },
                                ]}
                            />
                            <View
                                style={[
                                    styles.decorCircle2,
                                    { backgroundColor: config.bgGradient },
                                ]}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    dialogContainer: {
        width: width - 64,
        maxWidth: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        alignItems: 'center',
        paddingBottom: 28,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 20,
    },
    accentBar: {
        width: '100%',
        height: 5,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
        borderWidth: 2.5,
    },
    content: {
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 10,
        letterSpacing: 0.3,
    },
    message: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
        letterSpacing: 0.2,
    },
    button: {
        marginTop: 20,
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 14,
        minWidth: 140,
        alignItems: 'center',
        // Subtle shadow on button
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    // Decorative background circles
    decorCircle1: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.3,
        top: -20,
        right: -20,
    },
    decorCircle2: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        opacity: 0.2,
        bottom: 20,
        left: -15,
    },
});
